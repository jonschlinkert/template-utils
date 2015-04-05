'use strict';

var isObject = require('isobject');
var File = require('vinyl');
var props = require('./vinylProps');

/**
 * Returns true if a file is a vinyl file object.
 *
 * ```js
 * var file = utils.isVinyl(file);
 * ```
 *
 * @name .isVinyl
 * @param  {Object} `file` Object to test.
 * @return {Boolean} Returns true if it's a vinyl file.
 * @api public
 */

module.exports = function isVinyl_(file) {
  return isObject(file) && (file instanceof File || hasVinylProps(file));
};

/**
 * A couple of arbitrary props that, along with where the methods is
 * used, make this likely to be a vinyl file
 */

function hasVinylProps(file) {
  return 'isStream' in file  && 'clone' in file;
}
