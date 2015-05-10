'use strict';

/**
 * Ignore patterns for common files or folders
 * that we wouldn't want to glob by default
 */

module.exports = [
  '**/.DS_Store',
  '.git',
  'actual',
  'bower_components',
  'fixtures',
  'node_modules',
  'npm-debug.log',
  'temp',
  'test/actual',
  'test/fixtures',
  'tmp',
  'vendor',
  'wip'
];
