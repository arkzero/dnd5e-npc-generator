'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var attackCtrlStub = {
  index: 'attackCtrl.index',
  show: 'attackCtrl.show',
  create: 'attackCtrl.create',
  update: 'attackCtrl.update',
  destroy: 'attackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var attackIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './attack.controller': attackCtrlStub
});

describe('Attack API Router:', function() {

  it('should return an express router instance', function() {
    expect(attackIndex).to.equal(routerStub);
  });

  describe('GET /api/attacks', function() {

    it('should route to attack.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'attackCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/attacks/:id', function() {

    it('should route to attack.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'attackCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/attacks', function() {

    it('should route to attack.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'attackCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/attacks/:id', function() {

    it('should route to attack.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'attackCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/attacks/:id', function() {

    it('should route to attack.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'attackCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/attacks/:id', function() {

    it('should route to attack.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'attackCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
