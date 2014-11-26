'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var glob = require('globby');
var debug = require('debug')('template:utils:comment');
var extend = require('extend-shallow');
var headings = require('./headings');

module.exports = function comments(patterns, options) {
  var opts = extend({sep: '\n', dest: 'README.md'}, options);
  var ctx = extend({}, this && this.context);

  var cwd = opts.cwd ? opts.cwd : ctx.filepath
    ? path.dirname(ctx.filepath)
    : process.cwd();

  if (opts.dep) {
    var Lookup = require('lookup-deps');
    var lookup = new Lookup();

    var dep = lookup.paths(opts.dep);
    if (dep) {
      cwd = path.resolve(dep[opts.dep]);
    }
  }

  var files = glob.sync(patterns, {cwd: cwd});
  if (files.length === 0) {
    return '';
  }

  return files.map(function (fp) {
    var jscomments = require('js-comments');
    var dest = path.resolve(ctx.dest || opts.dest);
    fp = path.join(cwd, fp);

    var res = jscomments(fp, dest, opts);
    return headings(res, 1);
  }).join('\n');
};
