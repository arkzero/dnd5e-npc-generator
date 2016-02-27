'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var FeatureSchema = new Schema({
  name: String,             // Name of the Feature/Spell/Ability
  description: String,      // Description for the Feature/Spell/Ability
  expectedUses: Number,     // Number of times the Character is expected to use the Feature/Spell/Ability

  // Modifers to apply to the characters Stats
  modifiers: [{
    field: { // Field/Stat that is being modified on the Character
      type: String,
      enum: ['armorClass', 'hitPoints', 'attackBonus', 'damagePerRound', 'saveDC']
    },
    value: Number, // Amount that it is being modified by
    operator: { // Mathimatical operation to perform on the value.
      type: String,
      enum: ['plus', 'minus', 'multiply', 'divide']
    }
  }]
});

module.exports = mongoose.model('Feature', FeatureSchema);
