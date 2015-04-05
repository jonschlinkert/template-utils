'use strict';

var isObject = require('isobject');
var File = require('vinyl');

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
  return isObject(file) && file instanceof File;
};
