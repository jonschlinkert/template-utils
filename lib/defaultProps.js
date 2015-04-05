'use strict';

/**
 * Setup default properties and objects on a template object.
 *
 * @name  defaultProps
 * @param  {Object} `template` Template Object to add properties to.
 * @api public
 */

module.exports = function defaultProps(template) {
  template.options = template.options || {};
  template.locals = template.locals || {};
  template.data = template.data || {};

  template.data.src = template.data.src || {};
  template.data.dest = template.data.dest || {};
};
