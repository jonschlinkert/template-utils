/*!
 * template-utils <https://github.com/jonschlinkert/template-utils>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var fs = require('fs');
var assert = require('assert');
var Template = require('template');
var template = new Template();
var utils = require('..');


describe('.toTemplate()', function () {
  describe('errors', function () {
    it('should throw an error when `file` is not an object:', function () {
      (function () {
        utils.toTemplate();
      }).should.throw('template-utils.toTemplate() expects `file` to be an object');
    });

    it('should throw an error when `file.contents` is not a buffer:', function () {
      (function () {
        utils.toTemplate({});
      }).should.throw('template-utils.toTemplate() expects `file.contents` to be a buffer or string.');
    });
  });

  describe('properties', function () {
    it('should create a template object from a vinyl file object:', function () {
      var template = utils.toVinyl({path: process.cwd() + '/README.md', content: '---\ntitle: README\n---\nThis is content'});
      utils.toTemplate(template).should.eql(require('./expected/template-object'));
    });
  });
});

