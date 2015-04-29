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
var loaders = require('../lib/loaders');


describe('loaders', function () {
  describe('options.gitignore', function () {
    it('should use ignore patterns from `.gitignore` when options.gitignore is enabled', function () {
      template.enable('gitignore');

      template.loader('base', loaders.templates(template));
      template.create('dotfile', ['base']);
      template.dotfile('.*');

      var file = template.views.dotfiles['.editorconfig'];
      file.should.have.properties('data', 'locals', 'options');
    });
  });
});
