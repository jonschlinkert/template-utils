'use strict';

var nch = require('noncharacters');

module.exports = function unescapeFn(app, delimsArray) {
  var delims;

  if (app && app.delims) {
    delims = app.delims['.*'].original;
  }

  delims = delims || delimsArray || ['<%', '%>'];
  var re = makeRe(delims), esc = {};

  return function(str) {
    return str.replace(re, function (_, $1) {
      return makeReplacment($1, delims);
    });
  };
};

function makeRe(delims) {
  return new RegExp(makeDelims(delims), 'g');
}

function makeDelims() {
  return nch[0] + nch[1] + '([\\s\\S]+?)' + nch[2] + nch[3];
}

function makeReplacment(str, delims) {
  return delims[0] + '%=' + str + delims[1];
}

module.exports.makeRe = makeRe;
module.exports.makeDelims = makeDelims;
module.exports.makeReplacment = makeReplacment;
