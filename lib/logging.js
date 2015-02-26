'use strict';

/**
 * Create a template expression for use in logging/debugging.
 *
 * ```js
 * makeTag('foo', 'bar');
 * //=> '{{foo "bar"}}'
 * ```
 *
 * @param  {String} `name`
 * @param  {String} `key`
 * @param  {Array} `delims` Optionally pass custom delimiters.
 * @return {String}
 */

exports.makeTag = function makeTag(name, key, delims) {
  delims = delims || ['{{', '}}'];
  return ''
    + delims[0]
    + name + ' "' + key
    + delims[1]
    + '"';
};

console.log(tag('foo', 'bar'))
