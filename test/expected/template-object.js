'use strict';

var path = require('path');

module.exports = {
  base: process.cwd(),
  content: '---\ntitle: README\n---\nThis is content',
  cwd: process.cwd(),
  data: {
    dest: {
      basename: 'README.md',
      dirname: process.cwd(),
      ext: '.md',
      extSegments: ['.md'],
      extname: '.md',
      name: 'README',
      path: process.cwd() + '/README.md'
    },
    engine: '.md',
    src: {
      basename: 'README.md',
      dirname: process.cwd(),
      ext: '.md',
      extSegments: ['.md'],
      extname: '.md',
      name: 'README',
      path: process.cwd() + '/README.md'
    }
  },
  ext: '.md',
  locals: {},
  options: {
    dest: {
      basename: 'README.md',
      dirname: process.cwd(),
      ext: '.md',
      extSegments: ['.md'],
      extname: '.md',
      name: 'README',
      path: process.cwd() + '/README.md'
    },
    engine: '.md',
    src: {
      basename: 'README.md',
      dirname: process.cwd(),
      ext: '.md',
      extSegments: ['.md'],
      extname: '.md',
      name: 'README',
      path: process.cwd() + '/README.md'
    }
  },
  path: process.cwd() + '/README.md',
  relative: 'README.md',
  stat: null
};
