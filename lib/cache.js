'use strict';

var requires = {};

module.exports = function cache(name, fn) {
  return (requires[name] = requires[name] || fn);
};
