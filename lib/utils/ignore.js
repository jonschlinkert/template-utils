'use strict';

var fs = require('fs');
var path = require('path');
var parse = require('parse-gitignore');
var unique = require('array-unique');
var defaults = require('./ignore-defaults');

/**
 * Parse the local `.gitignore` file and add
 * the resulting ignore patterns.
 */

module.exports = function ignored_(cwd, customIgnorePatterns) {
  if (Array.isArray(cwd)) {
    customIgnorePatterns = cwd;
    cwd = process.cwd();
  }

  var arr = unique((customIgnorePatterns || []).concat(defaults));
  cwd = cwd || process.cwd();

  var fp = path.resolve(cwd, '.gitignore');
  if (!fs.existsSync(fp)) {
    return defaults;
  }
  return parse(fs.readFileSync(fp, 'utf8'), arr);
};
