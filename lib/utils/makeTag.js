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

module.exports = function makeTag(name, key, delims) {
  return inner[(delims = delims || ['{{', '}}']) && delims[0]](name, key);
};

var inner = {
  '<%=': function (name, key) {
    return '<%= ' + name + (key ? '("' + key + '")' : '') + ' %>';
  },
  '{{': function (name, key) {
    return '{{' + name + (key ? ' "' + key + '"' : '') + '}}';
  }
};
