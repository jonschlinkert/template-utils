'use strict';

var Loader = require('load-templates');
var merge = require('mixin-deep');
var utils = require('../utils');
var fileProps = ['history', 'base', 'relative', 'path', 'cwd', 'engine'];

/**
 * Default loader for Template
 */

module.exports = function(app) {
  var defaults = {rootKeys: fileProps};

  if (app.enabled('gitignore')) {
    var ignored = utils.ignore(process.cwd(), app.option('ignore'));
    defaults.ignore = ignored;
  }

  return function (args, options) {
    args = Array.isArray(args) ? args : [args];
    var opts = merge(defaults, app.options, options);
    var loader = new Loader(opts);
    var res = loader.load(args);
    return res;
  };
};
