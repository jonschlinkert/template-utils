'use strict';

/**
 * Properties on a vinyl file object
 */

// `main` is just used for checking props
exports.main = [
  '_contents',
  'clone',
  'isBuffer',
  'isDirectory',
  'isNull',
  'isStream'
];

exports.include = [
  'relative',
  'base',
  'cwd',
  'data',
  'locals',
  'options',
  'stat',
];

exports.ignore = ['inspect', 'pipe'].concat(exports.main);
