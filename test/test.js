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
var Vinyl = require('vinyl');
var utils = require('..')._;

var Template = require('template');
var template = new Template();


describe('.ignore()', function () {
  it('should return an array of ignored files:', function () {
    var files = utils.ignore();
    files.should.be.an.array;
    files.indexOf('*.DS_Store').should.not.equal(-1);
  });

  it('should add custom ignore patterns:', function () {
    var files = utils.ignore(['foo', 'bar']);
    files.should.be.an.array;
    files.indexOf('foo').should.not.equal(-1);
  });
});

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
    var file = new Vinyl({path: 'a/b/c'});
    file.contents = new Buffer('foo');
    utils.isVinyl(file, Vinyl).should.be.true;
  });
  it('should return false if a file is not vinyl file object:', function () {
    utils.isVinyl({}).should.be.false;
  });
});

describe('.toTemplate()', function () {
  describe('properties', function () {
    it('should create a template object from a vinyl file object:', function () {
      var file = utils.toVinyl({path: process.cwd() + '/README.md', content: '---\ntitle: README\n---\nThis is content'});

      utils.toTemplate(file).should.eql({
        history: [ '/Users/jonschlinkert/dev/template/utils/template-utils/README.md' ],
        cwd: '/Users/jonschlinkert/dev/template/utils/template-utils',
        base: '/Users/jonschlinkert/dev/template/utils/template-utils',
        content: '---\ntitle: README\n---\nThis is content',
        relative: 'README.md',
        path: '/Users/jonschlinkert/dev/template/utils/template-utils/README.md',
        data: {}
      });
    });
  });
});

describe('.toVinyl()', function () {
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
