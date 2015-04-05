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
var File = require('vinyl');
var Template = require('template');
var template = new Template();
var utils = require('../lib/utils');

describe('utils:', function () {
  describe('.headings()', function () {
    it('should skip fenced code blocks:', function () {
      utils.headings('```js\n# Foo\n```\n# Bar').should.eql('```js\n# Foo\n```\n\n## Bar');
    });

    it('should add one heading level:', function () {
      utils.headings('# Bar').should.eql('## Bar');
      utils.headings('## Bar').should.eql('### Bar');
      utils.headings('### Bar').should.eql('#### Bar');
    });

    it('should add the specified number of heading levels:', function () {
      utils.headings('# Bar', 1).should.eql('## Bar');
      utils.headings('# Bar', 2).should.eql('### Bar');
      utils.headings('# Bar', 3).should.eql('#### Bar');
      utils.headings('# Bar', 4).should.eql('##### Bar');
    });
  });

  describe('logging', function () {
    it('should create template tag:', function () {
      utils.makeTag('foo', 'bar').should.equal('{{foo "bar"}}');
      utils.makeTag('foo').should.equal('{{foo}}');
    });

    it('should use custom delimiters:', function () {
      utils.makeTag('foo', 'bar', ['{{', '}}']).should.equal('{{foo "bar"}}');
      utils.makeTag('foo', 'bar', ['{%=', '%}']).should.equal('{%= foo("bar") %}');
      utils.makeTag('foo', 'bar', ['<%=', '%>']).should.equal('<%= foo("bar") %>');
      utils.makeTag('foo', null, ['<%=', '%>']).should.equal('<%= foo %>');
    });
  });

  describe('.isVinyl()', function () {
    it('should return true if a file is a vinyl file object:', function () {
      var file = new File({path: 'a/b/c'});
      file.contents = new Buffer('foo');
      utils.isVinyl(file).should.be.true;
    });
    it('should return false if a file is not vinyl file object:', function () {
      utils.isVinyl({}).should.be.false;
    });
  });
});
