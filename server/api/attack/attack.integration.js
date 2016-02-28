'use strict';

var app = require('../..');
var request = require('supertest');

var newAttack;

describe('Attack API:', function() {

  describe('GET /api/attacks', function() {
    var attacks;

    beforeEach(function(done) {
      request(app)
        .get('/api/attacks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          attacks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(attacks).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/attacks', function() {

    beforeEach(function(done) {
      request(app)
        .post('/api/attacks')
        .send({
          name: 'New Attack',
          description: 'This is the brand new attack!!!',
          numDice: 3,
          diceType: 'd8',
          modifier: 4
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAttack = res.body;
          done();
        });
    });

    it('should respond with the newly created attack', function() {
      expect(newAttack.name).to.equal('New Attack');
      expect(newAttack.description).to.equal('This is the brand new attack!!!');
      expect(newAttack.numDice).to.equal(3);
      expect(newAttack.diceType).to.equal('d8');
      expect(newAttack.modifier).to.equal(4);
    });

  });

  describe('GET /api/attacks/:id', function() {
    var attack;

    beforeEach(function(done) {
      request(app)
        .get('/api/attacks/' + newAttack._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          attack = res.body;
          done();
        });
    });

    afterEach(function() {
      attack = {};
    });

    it('should respond with the requested attack', function() {
      expect(attack.name).to.equal('New Attack');
      expect(attack.description).to.equal('This is the brand new attack!!!');
      expect(attack.numDice).to.equal(3);
      expect(attack.diceType).to.equal('d8');
      expect(attack.modifier).to.equal(4);
    });

  });

  describe('PUT /api/attacks/:id', function() {
    var updatedAttack

    beforeEach(function(done) {
      request(app)
        .put('/api/attacks/' + newAttack._id)
        .send({
          name: 'Updated Attack',
          description: 'This is the updated attack!!!',
          numDice: 3,
          diceType: 'd8',
          modifer: 4
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAttack = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAttack = {};
    });

    it('should respond with the updated attack', function() {
      expect(updatedAttack.name).to.equal('Updated Attack');
      expect(updatedAttack.description).to.equal('This is the updated attack!!!');
      expect(updatedAttack.numDice).to.equal(3);
      expect(updatedAttack.diceType).to.equal('d8');
      expect(updatedAttack.modifier).to.equal(4);
    });

  });

  describe('DELETE /api/attacks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/attacks/' + newAttack._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when attack does not exist', function(done) {
      request(app)
        .delete('/api/attacks/' + newAttack._id)
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
