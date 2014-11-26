'use strict';

var async = require('async');

/**
 * Run middleware in parallel
 *
 * @api private
 */

module.exports = function parallel(fns) {
  return function (file, cb) {
    async.each(fns, function (fn, next) {
      fn(file, next);
    }, cb);
  };
};

