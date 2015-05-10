'use strict';

var fs = require('fs');
var path = require('path');
var isObject = require('isobject');
var isStream = require('is-stream');
var extract = require('extract-gfm');
var reduce = require('object.reduce');
var isNumber = require('is-number');
var Vinyl = require('vinyl');

/**
 * Expose `utils`
 */

var utils = require('export-files')(__dirname);

/**
 * Convert a Vinyl file object to a non-vinyl template object.
 *
 * ```js
 * var template = utils.toTemplate(file);
 * ```
 *
 * @name toTemplate
 * @param  {Object} `file` Vinyl file object
 * @return {Object} Object with properties expected by Template or Template apps
 * @api public
 */

utils.toTemplate = require('to-template');

/**
 * Convert a `template` object to a Vinyl file object.
 *
 * ```js
 * var file = utils.toVinyl(template);
 * ```
 *
 * @name toVinyl
 * @param  {Object} `file` Object with properties expected by Template
 * @return {Object} Vinyl file object
 * @api public
 */

utils.toVinyl = require('to-vinyl');

/**
 * Returns true if a file is a vinyl file object.
 *
 * ```js
 * var file = utils.isVinyl(file);
 * ```
 *
 * @name .isVinyl
 * @param  {Object} `file` Object to test.
 * @param  {Object} `Vinyl` Optionally pass an instance of [vinyl]
 * @return {Boolean} Returns true if it's a vinyl file.
 * @api public
 */

utils.isVinyl = function isVinyl(file, Vinyl) {
  if (!isObject(file)) return false;

  if (Vinyl && file instanceof Vinyl) {
    return true;
  }
  if (file.path && Buffer.isBuffer(file.contents)) {
    return true;
  }
  return false;
};

/**
 * Push a collection of templates into the stream as vinyl files.
 *
 * ```js
 * module.exports = function myPlugin(app) {
 *   var id = app.getTask();
 *   // create a template type for vinyl files and assign the `task` loader
 *   if (!app.hasOwnProperty(id)) {
 *     app.create(id, ['task']);
 *   }
 *   return through.obj(function (file, enc, cb) {
 *     // Convert vinyl file to template and add to collection
 *     app[id](file);
 *     cb();
 *   }, function (cb) {
 *     // Get the cached template and push into stream
 *     app.pushToStream(id, this);
 *     cb();
 *   });
 * };
 * ```
 *
 * @param  {Object} `collection` Template collection
 * @param  {Stream} `stream` Stream to push the files into
 * @api public
 */

utils.pushToStream = function pushToStream(collection, stream, fn) {
  if (isStream(stream) === false) {
    throw new TypeError('app#utils.pushToStream expects stream to be a stream.');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('app#utils.pushToStream expects fn to be a function.');
  }
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      stream.push(typeof fn === 'function' ? fn(collection[key], Vinyl) : collection[key]);
    }
  }
};

/**
 * Bind a `thisArg` to all the functions on the target
 * array of object.
 *
 * @param  {Object|Array} `target` Object or Array with functions as values that will be bound.
 * @param  {Object} `thisArg` Object to bind to the functions
 * @return {Object|Array} Object or Array with bound functions.
 * @api public
 */

utils.bindAll = function bindAll(target, thisArg) {
  if (Array.isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      target[i].bind(thisArg);
    }
    return target;
  }
  return reduce(target, function (acc, fn, key) {
    if (typeof fn === 'object' && typeof fn !== 'function') {
      acc[key] = utils.bindAll(fn, thisArg);
    } else {
      acc[key] = fn.bind(thisArg);
      if (fn.async) acc[key].async = fn.async;
    }
    return acc;
  }, {});
};

/**
 * Try to read a directory.
 */

utils.tryReaddir = function tryReaddir(dir) {
  if (typeof dir !== 'string') {
    throw new Error('utils.tryReaddir() expects a string.');
  }
  try {
    return fs.readdirSync(dir);
  } catch(err) {}
  return [];
};

/**
 * Get the basename of a file path, excluding extension.
 *
 * ```js
 * utils.basename('a/b/c.hbs');
 * //=> 'c'
 * ```
 *
 * @param {String} `fp`
 * @param {String} `ext` Optionally pass the extension.
 * @api public
 */

utils.basename = function basename(fp, ext) {
  if (typeof fp !== 'string') {
    throw new Error('basename() expects fp to be a string.');
  }
  var name = path.basename(fp);
  ext = ext || name.slice(name.lastIndexOf('.')) || '';
  return name.substr(0, name.length - ext.length);
};

/**
 * Rename a filepath to use as the key for caching templates.
 *
 * ```js
 * utils.renameKey('a/b/c/d/e/f.md', {last: 2});
 * //=> 'e/f.md'
 *
 * utils.renameKey('a/b/c/d/e/f.md', {last: 3});
 * //=> 'c/d/e/f.md'
 *
 * utils.renameKey('a/b/c/d/e/f.md', {last: 1, ext: false});
 * //=> 'f'
 * ```
 *
 * @param {String} `fp`
 * @param {String} `opts` Optionally pass `options.cwd`.
 * @api public
 */

utils.renameKey = function renameKey(fp, opts) {
  if (typeof fp !== 'string') {
    throw new Error('renameKey() expects fp to be a string.');
  }

  var ext = utils.getExt(fp);
  if (opts && isNumber(opts.last)) {
    var segs = fp.split(/[\\\/]/);
    segs = segs.slice(-opts.last);
    fp = segs.join('/');
  }

  if (opts && opts.ext === false) {
    fp = fp.slice(0, fp.length - ext.length);
  }
  return fp;
};

/**
 * Get the extension from a string or from the first string
 * in an array of file paths.
 *
 * ```js
 * utils.getExt('a/b/c.hbs');
 * //=> '.hbs'
 *
 * utils.getExt(['a/b/c.hbs', 'x/y/z.hbs']);
 * //=> '.hbs'
 * ```
 *
 * @param {String|Array} `val` Filepath or array of filepaths
 * @api public
 */

utils.getExt = function getExt(val) {
  if (typeof val !== 'string' && !Array.isArray(val)) {
    throw new Error('getExt() expects `val` to be a string or array.');
  }
  val = Array.isArray(val) ? val[0] : val;
  var i = val.lastIndexOf('.');
  if (i === -1) return '';
  return val.slice(i);
};

/**
 * Ensure file extensions are formatted properly for lookups.
 *
 * ```js
 * utils.formatExt('hbs');
 * //=> '.hbs'
 *
 * utils.formatExt('.hbs');
 * //=> '.hbs'
 * ```
 *
 * @param {String} `ext` File extension
 * @return {String}
 * @api public
 */

utils.formatExt = function formatExt(ext) {
  if (typeof ext !== 'string') {
    throw new Error('formatExt() expects `ext` to be a string.');
  }
  if (ext.charAt(0) !== '.') {
    return '.' + ext;
  }
  return ext;
};

/**
 * Strip the dot from a file extension
 *
 * ```js
 * utils.stripDot('.hbs');
 * //=> 'hbs'
 * ```
 *
 * @param {String} `ext` extension
 * @return {String}
 * @api public
 */

utils.stripDot = function stripDot(ext) {
  if (typeof ext !== 'string') {
    throw new Error('utils.stripDot() expects `ext` to be a string.');
  }
  if (ext.charAt(0) === '.') {
    return ext.slice(1);
  }
  return ext;
};

/**
 * Sanitize an array of extensions before converting
 * them to regex.
 *
 * This is used by the `extensionRe()` util for creating
 * a regex to match the given file extensions.
 *
 * @param  {Array} `extensions` Array of file extensions
 * @return {Array}
 * @api public
 */

utils.exts = function exts(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('utils.exts() expects an array.');
  }
  return arr.map(function (ext) {
    if(ext === '.*') return '$';
    return utils.stripDot(ext);
  });
};

/**
 * Creates a regex to match only the file extensions of registered
 * engines.
 *
 * This is used by the default middleware to prevent unregistered
 * extensions from being processed.
 *
 * @param  {String} `str`
 * @return {RegExp}
 * @api public
 */

utils.extensionRe = function extensionRe(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('utils.extensionRe() expects an array.');
  }
  return new RegExp('(?:' + utils.exts(arr).join('|') + ')$');
};

/**
 * Cast `value` to an array.
 *
 * ```js
 * utils.arrayify('abc');
 * //=> ['abc']
 *
 * utils.arrayify(['abc']);
 * //=> ['abc']
 * ```
 *
 * @param {Array|String} `value`
 * @return {Array}
 * @api public
 */

utils.arrayify = function arrayify(val) {
  var isArray = Array.isArray(val);
  if (typeof val !== 'string' && !isArray) {
    throw new Error('utils.arrayify() expects a string or array.');
  }
  return isArray ? val : [val];
};

/**
 * Adjust markdown heading levels.
 *
 * Adds one heading level next to all markdown headings to make
 * them correct within the scope of the inheriting document.
 * _Headings in fenced code blocks are skipped_.
 *
 * ```js
 * utils.heading(str);
 * ```
 *
 * @name .headings
 * @param {String} `str` Markdown string with headings to format.
 * @return {String}
 * @api public
 */

utils.headings = function headings(str, lvl) {
  if (typeof str !== 'string') {
    throw new Error('utils.headings() expects a string.');
  }
  var o = extract.parseBlocks(str);
  lvl = lvl ? '######'.substr(0, lvl + 1) : '##';
  o.text = o.text.replace(/^#/gm, lvl);
  return extract.injectBlocks(o.text, o.blocks);
};

/**
 * Expose `utils`
 */

module.exports = utils;
