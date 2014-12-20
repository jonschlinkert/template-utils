'use strict';

var path = require('path');
var parseFilepath = require('parse-filepath');
var defaults = require('./defaults');

/**
 * Add parsed `src` and `dest` path properties to the `data` object.
 *
 * @name parsePath
 * @param  {Object} `template` Template object
 * @api public
 */

module.exports = function parsePath (template) {
  defaults(template.data, ['src', 'dest'], {});

  // add default `src` and `dest` properties to the `data` object
  if (typeof template.path !== 'string') {
    throw new Error('[template-utils] parsePath expects `.path` to be a string');
  }
  template.ext = template.ext || path.extname(template.path);

  // Parse `template.path` into an object
  var parsed = parseFilepath(template.path);

  for (var prop in parsed) {
    if (Boolean(parsed[prop])) {
      defaults(template.data.src, [prop], parsed[prop]);
      defaults(template.data.dest, [prop], parsed[prop]);
    }
  }

  defaults(template.data.src, ['path'], template.path);
  defaults(template.data.dest, ['path'], template.data.src.path);
  defaults(template.data.dest, ['ext'], parsed.extname);
};
