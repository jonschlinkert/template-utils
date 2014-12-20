'use strict';

var toVinyl = require('./toVinyl');

/**
 * Add a collection of cached templates to a stream
 *
 * @param  {Object} `collection` Template collection in the form of `{key:value}` pairs.
 * @param  {Stream} `stream` Stream to push the files into
 */

module.exports = function pushToStream(collection, stream) {
  var files = Object.keys(collection);
  var len = files.length;
  var i = 0;

  while (i < len) {
    var name = files[i++];
    var file = collection[name];
    stream.push(toVinyl(file));
  }
};
