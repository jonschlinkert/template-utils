'use strict';

var toVinyl = require('./toVinyl');

/**
 * Add a collection of cached templates to a stream
 *
 * @param  {Object} `collection` Template collection in the form of `{key:value}` pairs.
 * @param  {Stream} `stream` Stream to push the files into
 */

module.exports = function pushToStream(collection, stream) {
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      stream.push(toVinyl(collection[key]));
    }
  }
};
