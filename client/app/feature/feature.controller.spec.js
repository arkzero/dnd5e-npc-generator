/*jshint expr: true*/
(function () {
  'use strict';

  describe('Feature Module Controllers', function () {

    // load the controllers' module
    beforeEach(module('dnd5eNpcGeneratorApp'));

    describe('Controller: FeatureCtrl', function () {

      var FeatureCtrl, scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FeatureCtrl = $controller('FeatureCtrl', {
          $scope: scope
        });
      }));

      it('should exist', function () {
        expect(FeatureCtrl).to.exist;
      });
    });

    describe('Controller: FeatureListCtrl', function () {

      var FeatureListCtrl, scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FeatureListCtrl = $controller('FeatureListCtrl', {
          $scope: scope
        });
      }));

      it('should exist', function () {
        expect(FeatureListCtrl).to.exist;
      });
    });

    describe('Controller: NewFeatureCtrl', function () {

      var NewFeatureCtrl, scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        NewFeatureCtrl = $controller('NewFeatureCtrl', {
          $scope: scope
        });
      }));

      it('should exist', function () {
        expect(NewFeatureCtrl).to.exist;
      });
    });

    describe('Controller: ViewFeatureCtrl', function () {

      var ViewFeatureCtrl, scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ViewFeatureCtrl = $controller('ViewFeatureCtrl', {
          $scope: scope
        });
      }));

      it('should exist', function () {
        expect(ViewFeatureCtrl).to.exist;
      });
    });

    describe('Controller: EditFeatureCtrl', function () {

      var EditFeatureCtrl, scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        EditFeatureCtrl = $controller('EditFeatureCtrl', {
          $scope: scope
        });
      }));

      it('should exist', function () {
        expect(EditFeatureCtrl).to.exist;
      });
    });

  });


})();
