'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var relative = require('relative');

/**
 * Utils
 */

var utils = require('export-files')(__dirname);

/**
 * Ensure that a file extension is properly formatted.
 *
 * ```js
 * utils.formatExt('md');
 * //=> '.md'
 * ```
 *
 * @param {String} `ext`
 * @api public
 */

utils.formatExt = function formatExt(ext) {
  if (typeof ext !== 'string') {
    throw new Error('formatExt() expects a string.');
  }
  if (ext && ext.charAt(0) !== '.') {
    return '.' + ext;
  }
  return ext;
};

/**
 * Cast `value` to an array.
 *
 * ```js
 * utils.arrayify('abc');
 * //=> ['abc']
 *
 * utils.arrayify(['abc']);
 * //=> ['abc']
 * ```
 *
 * @param {*} `value`
 * @api public
 */

utils.arrayify = function arrayify(val) {
  var isArray = Array.isArray(val);
  if (typeof val !== 'string' && !isArray) {
    throw new Error('arrayify() expects a string or array.');
  }
  return isArray ? val : [val];
};

/**
 * Get the basename of a file path, excluding extension.
 *
 * @param {String} `fp`
 * @param {String} `ext` Optionally pass the extension.
 * @api public
 */

utils.basename = function basename(fp, ext) {
  if (typeof fp !== 'string') {
    throw new Error('basename() expects fp to be a string.');
  }
  if (typeof ext !== 'string') {
    throw new Error('basename() expects ext to be a string.');
  }
  return fp.substr(0, fp.length - (ext || path.extname(fp)).length);
};

/**
 * Default `renameKey` function.
 *
 * @api public
 */

utils.renameKey = function renameKey(fp, acc, opts) {
  if (typeof fp !== 'string') {
    throw new Error('renameKey() expects fp to be a string.');
  }
  opts = opts || {};
  fp = relative.toBase(opts.cwd, fp);
  return utils.basename(fp);
};

/**
 * Get the extension from a string or from the first string
 * in an array of file paths.
 *
 * @api public
 */

utils.getExt = function getExt(val) {
  if (typeof val !== 'string' && !Array.isArray(val)) {
    throw new Error('getExt() expects `val` to be a string or array.');
  }
  val = Array.isArray(val) ? val[0] : val;
  return val.slice(val.lastIndexOf('.'));
};

/**
 * Ensure that a file extension is formatted properly.
 *
 * @param {String} `ext`
 * @api public
 */

utils.formatExt = function formatExt(ext) {
  if (typeof ext !== 'string') {
    throw new Error('formatExt() expects `ext` to be a string.');
  }
  if (ext && ext[0] !== '.') ext = '.' + ext;
  return ext;
};

/**
 * Expose `utils`
 */

module.exports = utils;
