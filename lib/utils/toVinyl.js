'use strict';

var debug = require('debug')('template:utils');
var File = require('vinyl');
var _ = require('lodash');
var extend = _.extend;

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

module.exports = function toVinyl(template, options) {
  debug('toVinyl: %j', arguments);
  template.locals = extend({}, template.locals, options);

  var file = new File({
    cwd: template.cwd || template.locals.cwd,
    base: template.base || template.locals.base,
    path: template.path,
  });

  if (template.content) {
    file.contents = new Buffer(template.content);
  }

  // create string props
  setProps(file, template, ['ext']);
  // create object props
  setProps(file, template, ['options', 'locals', 'data'], {});
  return file;
};


/**
 * Add properties to the given object.
 *
 * @param  {Object} `file`
 * @param  {Object} `template`
 * @param  {Array} `props` Array of properties to add
 * @param  {*} `defaultVal` optionally pass a default value
 * @return {Object}
 */

function setProps(file, template, props, defaultVal) {
  props = Array.isArray(props) ? props : [props];
  var len = props.length;
  var i = 0;

  while (len--) {
    var prop = props[i++];
    if (template.hasOwnProperty(prop)) {
      file[prop] = template[prop];

    } else if (defaultVal) {
      file[prop] = defaultVal;

    } else {
      continue;
    }
  }
}
