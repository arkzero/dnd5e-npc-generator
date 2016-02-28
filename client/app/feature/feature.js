'use strict';

angular.module('dnd5eNpcGeneratorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feature', {
        url: '/feature',
        abstract: true,
        views: {
          '@': {
            templateUrl: 'app/feature/feature.html',
            controller: 'FeatureCtrl'
          }
        }
      })
      .state('feature.list',  {
        url: '/list',
        views: {
          '@feature': {
            templateUrl: 'app/feature/views/list.html',
            controller: 'FeatureListCtrl'
          }
        }
      })
      .state('feature.new', {
        url: '/new',
        views: {
          '@feature': {
            templateUrl: 'app/feature/views/feature-form.html',
            controller: 'NewFeatureCtrl'
          }
        }
      })
      .state('feature.view', {
        url: '/:id',
        views: {
          '@feature': {
            templateUrl: 'app/feature/views/view.html',
            controller: 'ViewFeautreCtrl'
          }
        }
      })
      .state('feature.edit', {
        url: '/:id/edit',
        views: {
          '@feature': {
            templateUrl: 'app/feature/views/feature-form.html',
            controller: 'EditFeautreCtrl'
          }
        }
      });
  });
