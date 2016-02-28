(function (angular) {
  'use strict';

  angular.module('dnd5eNpcGeneratorApp')
    .controller('FeatureCtrl', [
      '$scope',
      function ($scope) {
        $scope.name = 'FeatureCtrl';
      }
    ])
    .controller('FeatureListCtrl', [
      '$scope',
      function ($scope) {
        $scope.message = 'Hello';
      }
    ])
    .controller('NewFeatureCtrl', [
      '$scope',
      function ($scope) {
        $scope.message = 'Hello';
      }
    ])
    .controller('ViewFeatureCtrl', [
      '$scope',
      function ($scope) {
        $scope.message = 'Hello';
      }
    ])
    .controller('EditFeatureCtrl', [
      '$scope',
      function ($scope) {
        $scope.message = 'Hello';
      }
    ]);

})(angular);
