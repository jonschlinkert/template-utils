'use strict';

var _ = require('lodash');
var path = require('path');
var matter = require('gray-matter');
var parsePath = require('parse-filepath');
var vinylProps = require('./vinylProps');

/**
 * Convert a Vinyl file object to a non-vinyl template object.
 *
 * @param  {Object} `file` Vinyl file object
 * @return {Object} Object with properties expected by Template or Template apps
 */

module.exports = function toTemplate(file) {
  if (!file) {
    throw new Error('[template-utils] toTemplate expects `file` to be an object');
  }

  var o = {};
  if (file.isNull()) {
    o = {content: null, orig: null, data: {}};

  } else if (Buffer.isBuffer(file.contents) || typeof file.contents === 'string') {
    o = _.merge({}, o, matter(file.contents.toString()));
  }

  _.extend(o, _.pick(file, vinylProps.whitelisted));

  // setup default properties on the template
  defaults(o, ['data', 'options', 'locals'], {});
  o.path = o.path || file.path;
  o.ext = o.ext || path.extname(o.path);

  defaults(o.options, ['engine'], o.ext);
  defaults(o.data, ['src', 'dest'], {});

  // add default `src` and `dest` properties to the `data` object
  if (typeof o.path !== 'string') {
    throw new Error('[template-utils] toTemplate expects `.path` to be a string');
  }

  // Parse `file.path` into an object
  var parsed = parsePath(o.path);

  for (var prop in parsed) {
    if (Boolean(parsed[prop])) {
      defaults(o.data.src, [prop], parsed[prop]);
      defaults(o.data.dest, [prop], parsed[prop]);
    }
  }

  defaults(o.data.src, ['path'], o.path);
  defaults(o.data.dest, ['path'], o.data.src.path);
  defaults(o.data.dest, ['ext'], parsed.extname);
  return o;
};

function defaults(o, props, fallback) {
  var len = props.length;
  var i = 0;
  while (len--) {
    var prop = props[i++];
    o[prop] = o[prop] || fallback;
  }
}
