/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/attacks              ->  index
 * POST    /api/attacks              ->  create
 * GET     /api/attacks/:id          ->  show
 * PUT     /api/attacks/:id          ->  update
 * DELETE  /api/attacks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Attack = require('./attack.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Attacks
exports.index = function(req, res) {
  Attack.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Attack from the DB
exports.show = function(req, res) {
  Attack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Attack in the DB
exports.create = function(req, res) {
  Attack.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Attack in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Attack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Attack from the DB
exports.destroy = function(req, res) {
  Attack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
