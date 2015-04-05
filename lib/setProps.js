'use strict';

/**
 * Add properties to the given object.
 *
 * @param  {Object} `file`
 * @param  {Object} `template`
 * @param  {Array} `props` Array of properties to add
 * @param  {*} `defaultVal` optionally pass a default value
 * @return {Object}
 */

module.exports = function setProps(file, template, props, defaultVal) {
  props = Array.isArray(props) ? props : [props];
  var len = props.length;

  while (len--) {
    var prop = props[len];
    if (template.hasOwnProperty(prop)) {
      file[prop] = template[prop];

    } else if (defaultVal) {
      file[prop] = defaultVal;
    }
  }
};
