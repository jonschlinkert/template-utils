'use strict';

var path = require('path');

/**
 * Vinyl file loader. Used in plugins to load vinyl
 * files onto `app.views`.
 *
 * @name .loaders.file
 * @param  {Object} `file` Vinyl file object
 * @return {Object} Template object
 * @api public
 */

module.exports = function(file) {
  var name = path.basename(file.path, path.extname(file.path));
  file.content = file.contents.toString();
  file.id = name;
  var template = {};
  template[name] = file;
  return template;
};
