'use strict';

/**
 * Properties on a vinyl file object
 */

exports.whitelisted = [
  'base',
  'cwd',
  'data',
  'history',
  'locals',
  'options',
  'stat',
];

exports.blacklisted = [
  '_contents',
  'clone',
  'inspect',
  'isBuffer',
  'isDirectory',
  'isNull',
  'isStream',
  'pipe'
];
