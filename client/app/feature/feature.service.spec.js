/*jshint expr: true*/
/*globals afterEach */
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

      var Features,
        exampleFeature,
        $rootScope;

      // Initialize the Service
      beforeEach(inject(function (_Features_, _$rootScope_) {
        Features = _Features_;
        exampleFeature = angular.copy(feature1);
        $rootScope = _$rootScope_;
      }));

      it ('should exist', function () {
        expect(Features).to.exist;
      });

      describe('CREATE Feature Object', function () {

        // Happy Path
        it ('should send a POST request to CREATE a Feature Object', function () {
          var resFeature;

          // Expected API Request
          $httpBackend.expectPOST('/api/features', {
            name: 'Feature',
            description: 'Feature Description',
            expectedUses: 0,
            modifiers: [{
              field: 'armorClass',
              value: 4,
              operator: 'plus'
            }, {
              field: 'damagePerRound',
              value: 3,
              operator: 'minus',
              modifiesEffective: false
            }]
          }).respond(200, feature1);

          // Function Call and Response Listeners
          Features.create({
            name: 'Feature',
            description: 'Feature Description',
            expectedUses: 0,
            modifiers: [{
              field: 'armorClass',
              value: 4,
              operator: 'plus'
            }, {
              field: 'damagePerRound',
              value: 3,
              operator: 'minus',
              modifiesEffective: false
            }]
          }).then(function (result) {  // Promise Callback (Should be Called)
            resFeature = result.plain();
          }).catch(function () {      // Error Callback (Should not be called)
            expect(false).to.be.true;
          });

          // Verify returned response
          $httpBackend.flush();
          expect(resFeature).to.eql(feature1);
        });

        // Error Path 1
        it ('should return an error if the provided Feature is not an object', function () {
          var returnedError;

          // Make improper Function call
          Features.create().then(function () {
            expect(false).to.be.true;
          }).catch(function (errorMessage) {
            returnedError = errorMessage;
          });

          // Digest Promise and Check Error
          $rootScope.$digest();
          expect(returnedError).to.equal('Provided Feature must be an Object');
        });
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
