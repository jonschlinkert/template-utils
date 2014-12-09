'use strict';

var _ = require('lodash');
var matter = require('gray-matter');
var vinylProps = require('./vinylProps');
var defaultProps = require('./defaultProps');

/**
 * Convert a Vinyl file object to a non-vinyl template object.
 *
 * ```js
 * var template = utils.toTemplate(file);
 * ```
 *
 * @name toTemplate
 * @param  {Object} `file` Vinyl file object
 * @return {Object} Object with properties expected by Template or Template apps
 * @api public
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
  o.path = o.path || file.path;
  defaultProps(o);

  return o;
};
