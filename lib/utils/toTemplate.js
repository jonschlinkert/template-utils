'use strict';

var extend = require('extend-shallow');
var matter = require('gray-matter');
var merge = require('merge-deep');
var pick = require('object.pick');
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
    o = merge({}, o, matter(file.contents.toString()));
  }

  extend(o, pick(file, vinylProps.whitelisted));

  // add default properties to the template
  o.path = o.path || file.path;
  defaultProps(o);
  return o;
};
