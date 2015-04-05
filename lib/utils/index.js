'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

/**
 * Expose `utils`
 */

var utils = module.exports = require('export-files')(__dirname);

/**
 * Ensure that a file extension is formatted properly.
 *
 * @param {String} `ext`
 */

utils.formatExt = function formatExt(ext) {
  if (ext && ext[0] !== '.') ext = '.' + ext;
  return ext;
};
