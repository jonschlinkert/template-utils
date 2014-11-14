'use strict';

var extract = require('extract-gfm');

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
 * @name headings
 * @param {String} `str`
 * @return {String}
 * @api public
 */

module.exports = function headings(str, lvl) {
  var o = extract.parseBlocks(str);
  lvl = lvl ? new Array(lvl + 2).join('#') : '##';
  o.text = o.text.replace(/^#/gm, lvl);
  return extract.injectBlocks(o.text, o.blocks);
};
