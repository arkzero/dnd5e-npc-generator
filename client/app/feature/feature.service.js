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
    .factory('Features', ['FeatureRestangular', '$q', function (FeatureRestangular, $q) {
      var featureApi = FeatureRestangular.one('features');

      /**
       * Helper Function that returns a rejected promise with a variable message
       * @param {string} message - Message to return
       * @returns {Object} -> {Rejection Message}
       */
      function returnError(message) {
        var deferred = $q.defer();
        deferred.reject(message);
        return deferred.promise;
      }

      return {

        create: function (feature) {
          if (!angular.isObject(feature)) {
            return returnError('Provided Feature must be an Object');
          }
          return featureApi.post(null, feature);
        },

        get: function (_id) {
          return _id;
        },

        update: function (feature) {
          return feature;
        },

        delete: function (feature) {
          return feature;
        },

        getList: function () {

        }

      };
    }]);
})(angular);
