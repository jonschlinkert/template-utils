'use strict';
var toVinyl = require('./toVinyl');
var _ = require('lodash');

/**
 * Add a collection of cached templates to a stream
 *
 * @param  {Object} `collection` Template collection in the form of `{key:value}` pairs.
 * @param  {Stream} `stream` Stream to push the files into
 */

var pushToStream = function (collection, stream) {
  _.forIn(collection, function (file) {
    stream.push(toVinyl(file));
  });
};

/**
 * Export an object with methods
 */

module.exports = {
  pushToStream: pushToStream
};
