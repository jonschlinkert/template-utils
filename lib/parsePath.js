'use strict';

var path = require('path');
var parseFilepath = require('parse-filepath');
var setDefaults = require('./setDefaults');

/**
 * Add parsed `src` and `dest` path properties to the `data` object.
 *
 * @name parsePath
 * @param  {Object} `template` Template object
 * @api public
 */

module.exports = function parsePath (template) {
  setDefaults(template.data, ['src', 'dest'], {});

  // add default `src` and `dest` properties to the `data` object
  if (typeof template.path !== 'string') {
    throw new Error('[template-utils] parsePath expects `.path` to be a string');
  }
  template.ext = template.ext || path.extname(template.path);

  // Parse `template.path` into an object
  var parsed = parseFilepath(template.path);

  for (var prop in parsed) {
    setDefaults(template.data.src, [prop], parsed[prop]);
    setDefaults(template.data.dest, [prop], parsed[prop]);
  }

  setDefaults(template.data.src, ['path'], template.path);
  setDefaults(template.data.dest, ['path'], template.data.src.path);
  setDefaults(template.data.dest, ['ext'], parsed.extname);
};
