'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AttackSchema = new Schema({
  name: String,
  description: String,
  numDice: Number,
  diceType: {
    type: String,
    enum: ['d4', 'd6', 'd8', 'd10', 'd12']
  },
  modifier: Number,
  type: {
    type: String,
    enum: ['attack', 'save'],
    default: 'attack'
  }
});

module.exports = mongoose.model('Attack', AttackSchema);
