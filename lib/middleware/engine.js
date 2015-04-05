'use strict';

/**
 * Detect the engine to use, and set on `file.options`
 */

module.exports = function options_(file, next) {
  file.options.engine = file.options.engine || file.ext || '.md';
  next();
};
