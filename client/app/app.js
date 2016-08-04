'use strict';

angular.module('dnd5eNpcGeneratorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'restangular'
])
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('authInterceptor');
    }
  ])

  .factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
    var state;
	// Jen was here!!!
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run([
    '$rootScope', '$state', 'Auth',
    function($rootScope, $state, Auth) {
      // Redirect to login if route requires auth and the user is not logged in
      $rootScope.$on('$stateChangeStart', function(event, next) {
        if (next.authenticate) {
          Auth.isLoggedIn(function(loggedIn) {
            if (!loggedIn) {
              event.preventDefault();
              $state.go('login');
            }
          });
        }
      });

      // Inject Services into the Root Scope so they're accessible in templates
      $rootScope.$state = $state;

    }
  ]);
