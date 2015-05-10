/*!
 * template-utils <https://github.com/jonschlinkert/template-utils>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps: mocha */
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

describe('.basename()', function () {
  it('should get the basename of a filepath without extension:', function () {
    utils.basename('a/b/c/d.e').should.equal('d');
    utils.basename('a/b/c/b.d.e').should.equal('b.d');
  });
});

describe('.formatExt()', function () {
  it('should ensure that a file extension has a dot:', function () {
    utils.formatExt('a').should.equal('.a');
    utils.formatExt('.a').should.equal('.a');
  });
});

describe('.stripDot()', function () {
  it('should remove the dot from a file extension:', function () {
    utils.stripDot('.a').should.equal('a');
    utils.stripDot('a').should.equal('a');
  });
});

describe('.getExt()', function () {
  it('should get a file extension:', function () {
    utils.getExt('a/b/c/d/a').should.equal('');
    utils.getExt('a/b/c/d/hbs').should.equal('');
    utils.getExt('a/b/c/d/e.hbs').should.equal('.hbs');
    utils.getExt('a/b/c.a').should.equal('.a');
  });
});

describe('.renameKey()', function () {
  it('should rename the filepath:', function () {
    utils.renameKey('a/b/c/d.e', {last: 1}).should.equal('d.e');
    utils.renameKey('a/b/c/d.e', {last: 2}).should.equal('c/d.e');
    utils.renameKey('a/b/c/d.e', {last: 3}).should.equal('b/c/d.e');
    utils.renameKey('a/b/c/d.e', {last: 3, ext: false}).should.equal('b/c/d');
  });
});
