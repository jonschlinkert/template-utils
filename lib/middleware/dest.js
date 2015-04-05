'use strict';

/**
 * noop. `file.data.dest` is handled by a plugin.
 */

module.exports = function dest_(file, next) {
  file.data.dest = file.data.dest || {};
  next();
};
