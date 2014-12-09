'use strict';

var defaults = require('./defaults');
var parsePath = require('./parsePath');

/**
 * Setup default properties and objects on a template object.
 *
 * @name  defaultProps
 * @param  {Object} `template` Template Object to add properties to.
 * @api public
 */

module.exports = function defaultProps (template) {
  // add default properties to template object
  defaults(template, ['data', 'options', 'locals'], {});

  // add default path properties to template object
  parsePath(template);

  // add default engine to template.options
  defaults(template.options, ['engine'], template.ext);
};