/**
 * Feature model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Feature = require('./feature.model');
var FeatureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FeatureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Feature.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FeatureEvents.emit(event + ':' + doc._id, doc);
    FeatureEvents.emit(event, doc);
  }
}

module.exports = FeatureEvents;
