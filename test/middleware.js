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
var middleware = require('../lib/middleware');
var utils = require('..')._;

describe('middleware', function () {
  beforeEach(function () {
    template.onLoad(/./, utils.series([
      middleware.props,
      middleware.ext,
      middleware.src,
      middleware.dest
    ]));

    template.page('readme', utils.toTemplate({
      path: process.cwd() + '/README.md',
      content: '---\ntitle: README\n---\nThis is content'
    }));
  });

  describe('.props()', function () {
    it('should extend the `file` object with properties:', function () {
      var file = template.views.pages.readme;
      file.should.have.properties('data', 'locals', 'options');
    });
  });

  describe('.src()', function () {
    it('should add the `src` property to `file.data`:', function () {
      var file = template.views.pages.readme;
      file.should.have.property('data');
      file.data.should.have.property('src');
      file.data.src.should.have.properties('path', 'dirname', 'filename', 'basename', 'extname');
    });
  });

  describe('.ext()', function () {
    it('should add the `ext` property to the `file` object:', function () {
      var file = template.views.pages.readme;
      file.should.have.property('ext');
    });
  });
});
