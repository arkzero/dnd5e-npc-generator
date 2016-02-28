/*jshint expr: true*/
(function () {
  'use strict';

  describe('Feature Module Services', function () {

    var $httpBackend,
      feature1 = {
        _id: '1',
        name: 'Feature',
        description: 'Feature Description',
        expectedUses: 0,
        modifiers: [{
          field: 'armorClass',
          value: 4,
          operator: 'plus',
          modifiesEffective: true
        }, {
          field: 'damagePerRound',
          value: 3,
          operator: 'minus',
          modifiesEffective: false
        }]
      };

    // load the Service's Modules
    beforeEach(module('dnd5eNpcGeneratorApp', function ($provide) {
      $provide.value('authInterceptor', {});
      $provide.value('$stateProvider', {});
      $provide.value('$urlRouterProvider', {});
      $provide.value('Auth', {});
      $provide.value('$state', {});
    }));

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    describe('Service: FeatureRestangular', function () {

      var FeatureRestangular, mockFeature;

      beforeEach(inject(function (_FeatureRestangular_) {
        FeatureRestangular = _FeatureRestangular_;
        mockFeature = angular.copy(feature1);
      }));

      it('should exist', function () {
        expect(FeatureRestangular).to.exist;
      });

      it ('#one() should return Feature data (normal)', function () {
        var resFeature = {};

        $httpBackend.expectGET('/api/feature/123').respond(200, mockFeature);

        FeatureRestangular.one('feature', '123').get().then(function (result) {
          resFeature = result;
        });

        $httpBackend.flush();

        expect(resFeature.plain()).to.be.eql(mockFeature);
      });
    });

    describe('Service: Features', function () {

      var Features;

      // Initialize the Service
      beforeEach(inject(function (_Features_) {
        Features = _Features_;
      }));

      it ('should exist', function () {
        expect(Features).to.exist;
      });

      it ('should send a POST request to CREATE a Feature Object', function () {
        
      });

      it ('should send a GET request to READ a Feature Object', function () {

      });

      it ('should send a PUT request to UPDATE a Feature Object', function () {

      });

      it ('should send a DELETE request to DELETE a Feature Object', function () {

      });

      it ('should GET a list of Features', function () {

      });

    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });
})();
