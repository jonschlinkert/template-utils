'use strict';

var isObject = require('is-plain-object');
var mapFiles = require('map-files');
var utils = require('../utils');

module.exports = function base_(args) {
  args = utils.arrayify(args);
  var last = args[args.length - 1];

  // if the second arg is an object, it's an `options` object
  if(isObject(last)) {
    last.renameKey = last.renameKey || utils.renameKey;
    if (last.hasOwnProperty('content')) {
      // => already expanded
      return normalize(args);
    }
  }
  return mapFiles.apply(mapFiles, args);
};

function normalize(args) {
  var fp = args[0];
  var o = args[1];
  var name = utils.basename(fp);
  o.path = fp;
  var res = {};
  res[name] = o;
  return res;
}
