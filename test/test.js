/*!
 * verb-util <https://github.com/jonschlinkert/verb-util>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var should = require('should');
var utils = require('..');

describe('utils', function () {
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

  describe('.toVinyl()', function () {
    it('should create a vinyl file object:', function () {
      var file = utils.toVinyl({});
      file.should.have.properties(['_contents', 'base', 'cwd', 'data', 'locals']);
    });

    it('should add the `.path` property to history:', function () {
      var file = utils.toVinyl({path: process.cwd() + '/README.md'});
      file.should.have.property('history', [process.cwd() + '/README.md']);
    });
  });

  describe('.toTemplate()', function () {
    it('should create a template object from a vinyl file object:', function () {
      var template = utils.toVinyl({path: process.cwd() + '/README.md', content: '---\ntitle: README\n---\nThis is content'});
      utils.toTemplate(template).should.eql(require('./expected/template-object'));
    });
  });
});

