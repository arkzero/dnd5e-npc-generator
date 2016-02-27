'use strict';

var app = require('../..');
var request = require('supertest');

var newFeature;

describe('Feature API:', function() {

  describe('GET /api/features', function() {
    var features;

    beforeEach(function(done) {
      request(app)
        .get('/api/features')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          features = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(features).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/features', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/features')
        .send({
          name: 'New Feature',
          description: 'This is the brand new feature!!!',
          expectedUses: 3,
          modifiers: [{
            field: 'armorClass',
            value: 4,
            operator: 'plus'
          }, {
            field: 'hitPoints',
            value: 12,
            operator: 'minus',
            modifiesEffective: false
          }]
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newFeature = res.body;
          done();
        });
    });

    it('should respond with the newly created feature', function() {
      expect(newFeature.name).to.equal('New Feature');
      expect(newFeature.description).to.equal('This is the brand new feature!!!');
      expect(newFeature.expectedUses).to.equal(3);
      expect(newFeature.modifiers.length).to.equal(2);
      expect(newFeature.modifiers[0].field).to.equal('armorClass');
      expect(newFeature.modifiers[0].value).to.equal(4);
      expect(newFeature.modifiers[0].operator).to.equal('plus');
      expect(newFeature.modifiers[0].modifiesEffective).to.be.true;
      expect(newFeature.modifiers[1].field).to.equal('hitPoints');
      expect(newFeature.modifiers[1].value).to.equal(12);
      expect(newFeature.modifiers[1].operator).to.equal('minus');
      expect(newFeature.modifiers[1].modifiesEffective).to.be.false;
    });

  });

  describe('GET /api/features/:id', function() {
    var feature;

    beforeEach(function(done) {
      request(app)
        .get('/api/features/' + newFeature._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          feature = res.body;
          done();
        });
    });

    afterEach(function() {
      feature = {};
    });

    it('should respond with the requested feature', function() {
      expect(feature.name).to.equal('New Feature');
      expect(feature.description).to.equal('This is the brand new feature!!!');
      expect(feature.expectedUses).to.equal(3);
      expect(feature.modifiers.length).to.equal(2);
      expect(feature.modifiers[0].field).to.equal('armorClass');
      expect(feature.modifiers[0].value).to.equal(4);
      expect(feature.modifiers[0].operator).to.equal('plus');
      expect(feature.modifiers[0].modifiesEffective).to.be.true;
      expect(feature.modifiers[1].field).to.equal('hitPoints');
      expect(feature.modifiers[1].value).to.equal(12);
      expect(feature.modifiers[1].operator).to.equal('minus');
      expect(feature.modifiers[1].modifiesEffective).to.be.false;
    });

  });

  describe('PUT /api/features/:id', function() {
    var updatedFeature

    beforeEach(function(done) {
      request(app)
        .put('/api/features/' + newFeature._id)
        .send({
          name: 'Updated Feature',
          info: 'This is the updated feature!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFeature = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFeature = {};
    });

    it('should respond with the updated feature', function() {
      expect(updatedFeature.name).to.equal('Updated Feature');
      expect(updatedFeature.description).to.equal('This is the brand new feature!!!');
      expect(updatedFeature.expectedUses).to.equal(3);
      expect(updatedFeature.modifiers.length).to.equal(2);
      expect(updatedFeature.modifiers[0].field).to.equal('armorClass');
      expect(updatedFeature.modifiers[0].value).to.equal(4);
      expect(updatedFeature.modifiers[0].operator).to.equal('plus');
      expect(updatedFeature.modifiers[0].modifiesEffective).to.be.true;
      expect(updatedFeature.modifiers[1].field).to.equal('hitPoints');
      expect(updatedFeature.modifiers[1].value).to.equal(12);
      expect(updatedFeature.modifiers[1].operator).to.equal('minus');
      expect(updatedFeature.modifiers[1].modifiesEffective).to.be.false;
    });

  });

  describe('DELETE /api/features/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/features/' + newFeature._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when feature does not exist', function(done) {
      request(app)
        .delete('/api/features/' + newFeature._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
