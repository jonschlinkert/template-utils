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


describe('.toVinyl()', function () {
  describe('errors', function () {
    it('should throw an error when `template` is not an object:', function () {
      (function () {
        utils.toVinyl();
      }).should.throw('template-utils.toVinyl() expects an object.');
    });

    it('should throw an error when `template.content` is not a string:', function () {
      (function () {
        utils.toVinyl({});
      }).should.throw('template-utils.toVinyl() expects `template.content` to be a string.');
    });
  });

  describe('properties', function () {
    it('should create a vinyl file object:', function () {
      var file = utils.toVinyl({path: '.', content: ''});
      file.should.have.properties(['_contents', 'base', 'cwd']);
    });

    it('should add the value of the `.path` property to history:', function () {
      var file = utils.toVinyl({path: process.cwd() + '/README.md', content: ''});
      file.should.have.property('history', [process.cwd() + '/README.md']);
    });
  });
});
