'use strict';

var isObject = require('isobject');

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

module.exports = function isVinyl(file, Vinyl) {
  if (!isObject(file)) return false;

  if (Vinyl && file instanceof Vinyl) {
    return true;
  }
  if (file.path && Buffer.isBuffer(file.contents)) {
    return true;
  }
  return false;
};
