(function (angular) {
  'use strict';

  angular.module('dnd5eNpcGeneratorApp')
    .factory('FeatureRestangular', [
      'Restangular',
      function (Restangular) {
        var FeatureRestangular = Restangular.withConfig(function (RestangularConfiguer) {
          RestangularConfiguer.setBaseUrl('/api');
        });

        FeatureRestangular.extendModel('feature', function (model) {
          return model;
        });

        return FeatureRestangular;
      }
    ])
    .factory('Features', ['FeatureRestangular', function () {
      //var featureApi;
      return {

      };
    }]);
})(angular);
