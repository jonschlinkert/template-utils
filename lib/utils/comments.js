'use strict';

var path = require('path');
var glob = require('globby');
var debug = require('debug')('template:utils:comment');
var extend = require('extend-shallow');

module.exports = function comment(patterns, options) {
  var opts = extend({sep: '\n', dest: 'README.md'}, options);
  var ctx = extend({}, this.context);

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
    fp = path.join(cwd, fp);
    return jscomments(fp, opts.dest, opts);
  }).join('\n');
};