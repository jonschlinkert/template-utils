'use strict';

var EscapeDelims = require('escape-delims');
var escapeDelims = new EscapeDelims();

/**
 * Escape delimiters
 */

exports.escape = function (app) {
  return function escape(file, next) {
    var delims = app.options.escapeDelims;
    if (delims) {
      file.content = escapeDelims.escape(file.content, delims.from);
    }
    next();
  };
};


/**
 * Un-escape delimiters
 */

exports.unescape = function (app) {
  return function unescape(file, next) {
    var delims = app.options.escapeDelims;
    if (delims) {
      file.content = escapeDelims.unescape(file.content, delims.to);
    }
    next();
  };
};
