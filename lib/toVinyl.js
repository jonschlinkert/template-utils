'use strict';

var debug = require('debug')('template:utils');
var isObject = require('isobject');
var File = require('vinyl');

/**
 * Convert a `template` object to a Vinyl file object.
 *
 * ```js
 * var file = utils.toVinyl(template);
 * ```
 *
 * @name toVinyl
 * @param  {Object} `file` Object with properties expected by Template
 * @return {Object} Vinyl file object
 * @api public
 */

module.exports = function toVinyl_(template) {
  debug('toVinyl: %j', arguments);

  if (!isObject(template)) {
    throw new TypeError('template-utils.toVinyl() expects an object.');
  }

  if (typeof template.content !== 'string') {
    throw new Error('template-utils.toVinyl() expects `template.content` to be a string.');
  }

  var file = new File({path: template.path});
  for (var key in template) {
    if (template.hasOwnProperty(key)) {
      file[key] = template[key];
    }
  }

  file.contents = new Buffer(template.content);
  return file;
};
