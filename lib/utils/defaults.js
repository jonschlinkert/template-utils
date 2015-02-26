'use strict';

/**
 * Add default properties to an object.
 *
 * @param  {Object} `o` Object to add properties to.
 * @param  {Array} `props` Property names to look for.
 * @param  {Any} `fallback` Value to add if property doesn't exist on object.
 */

module.exports = function defaults(o, props, fallback) {
  if (o == null) {
    throw new Error('template-utils.defaults() expects an object.');
  }

  var len = props.length;
  var i = 0;

  while (len--) {
    var prop = props[i++];
    o[prop] = o[prop] || fallback;
  }
};