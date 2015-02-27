'use strict';

var nch = require('noncharacters');

module.exports = function escapeFn(app, delimsArray) {
  var delims;

  if (app && app.delims) {
    delims = app.delims['.*'].original;
  }

  delims = delims || delimsArray || ['<%', '%>'];
  var re = makeRe(delims), esc = {};

  return function(str) {
    return str.replace(re, function (_, $1) {
      return makeReplacment($1);
    });
  };
};

function makeRe(delims) {
  return new RegExp(makeDelims(delims), 'g');
}

function makeDelims(delims) {
  return delims[0] + '%=([\\s\\S]+?)' + delims[1];
}

function makeReplacment(i) {
  return nch[0] + nch[1] + i + nch[2] + nch[3];
}

module.exports.makeRe = makeRe;
module.exports.makeDelims = makeDelims;
module.exports.makeReplacment = makeReplacment;
