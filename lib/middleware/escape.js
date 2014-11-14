'use strict';

var EscapeDelims = require('escape-delims');
var escapeDelims = new EscapeDelims();

/**
 * Escape delimiters if specified in the options
 */

exports.before = function (app) {
  return function before(file, next) {
    var delims = app.options.escapeDelims;
    if (delims) {
      file.content = escapeDelims.escape(file.content, delims.from);
    }
    next();
  };
};


/**
 * Un-escape delimiters if specified in the options
 */

exports.after = function (app) {
  return function after(file, next) {
    var delims = app.options.escapeDelims;
    if (delims) {
      file.content = escapeDelims.unescape(file.content, delims.to);
    }
    next();
  };
};
