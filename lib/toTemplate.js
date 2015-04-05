'use strict';

var extend = require('extend-shallow');
var merge = require('merge-deep');
var pick = require('object.pick');
var vinylProps = require('./vinylProps');

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
    throw new Error('template-utils.toTemplate() expects `file` to be an object');
  }

  var template = {};

  for (var key in file) {
    if (file.hasOwnProperty(key)) {
      if (vinylProps.ignore.indexOf(key) === -1) {
        template[key] = file[key];
      }
    }
  }

  template.relative = file.relative;
  template.path = template.path || file.path;

  if (Buffer.isBuffer(file.contents) || typeof file.contents === 'string') {
    template.content = file.contents.toString();
  } else {
    throw new Error('template-utils.toTemplate() expects `file.contents` to be a buffer or string.');
  }

  return template;
};
