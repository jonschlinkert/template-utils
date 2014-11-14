'use strict';

var path = require('path');
var parsePath = require('parse-filepath');
var matter = require('gray-matter');
var _ = require('lodash');

var toVinyl = require('./lib/utils/toVinyl');


function toTemplate(file) {
  if (!file) {
    throw new Error('[template-utils] toTemplate expects `file` to be an object');
  }

  var o = {};
  if (file.isNull()) {
    o = {content: null, orig: null, data: {}};
  }

  else if (Buffer.isBuffer(file.contents) || typeof file.contents === 'string') {
    o = matter(file.contents.toString());
  }

  for (var key in file) {
    if (key !== 'path' && ['contents', '_contents'].indexOf(key) === -1) {
      o[key] = file[key];
    }
  }

  // setup default properties on the template
  defaults(o, ['data', 'options', 'locals'], {});

  o.path = o.path || file.path;
  o.ext = o.ext || path.extname(o.path);

  defaults(o.options, ['engine'], o.ext);
  defaults(o.data, ['src', 'dest'], {});


  // add default `src` and `dest` properties to the `data` object
  if (typeof o.path !== 'string') {
    throw new Error('[template-utils] toTemplate expects `.path` to be a string');
  }

  var parsed = parsePath(o.path);
  for (var prop in parsed) {
    if (Boolean(parsed[prop])) {
      defaults(o.data.src, [prop], parsed[prop]);
      defaults(o.data.dest, [prop], parsed[prop]);
    }
  }

  defaults(o.data.src, ['path'], o.path);
  defaults(o.data.dest, ['path'], o.data.src.path);
  defaults(o.data.dest, ['ext'], parsed.extname);
  return o;
}
// function toTemplate(file) {
//   if (!file) {
//     throw new Error('[template-utils] toTemplate expects `file` to be an object');
//   }

//   var o = {};
//   if (file.isNull()) {
//     o = {content: null, orig: null, data: {}};
//   }

//   else if (Buffer.isBuffer(file.contents) || typeof file.contents === 'string') {
//     o = matter(file.contents.toString());
//   }

//   for (var key in file) {
//     if (key !== 'path' && ['contents', '_contents'].indexOf(key) === -1) {
//       o[key] = file[key];
//     }
//   }

//   // setup default properties on the template
//   o.data = o.data || {};
//   o.options = o.options || {};
//   o.locals = o.locals || {};

//   o.path = o.path || file.path;
//   o.ext = o.ext || path.extname(o.path);

//   o.options.engine = o.options.engine || o.ext;
//   o.data.src = o.data.src || {};
//   o.data.dest = o.data.dest || {};

//   // add default `src` and `dest` properties to the `data` object
//   if (typeof o.path !== 'string') {
//     throw new Error('[template-utils] toTemplate expects `.path` to be a string');
//   }

//   var parsed = parsePath(o.path);

//   for (var prop in parsed) {
//     if (parsed.hasOwnProperty(prop)) {
//       o.data.src[prop] = o.data.src[prop] || parsed[prop];
//       o.data.dest[prop] = o.data.dest[prop] || parsed[prop];
//     }
//   }

//   o.data.src.path = o.data.src.path || o.path;
//   o.data.dest = _.extend(o.data.dest, {
//     path: o.data.src.path,
//     ext: parsed.extname
//   });
//   return o;
// }

function defaults(o, props, fallback) {
  var len = props.length;
  var i = 0;
  while (len--) {
    var prop = props[i++];
    o[prop] = o[prop] || fallback;
  }
}

var file = toVinyl({path: 'a/b/c.d', contents: 'this is content'});
var foo = toTemplate(file);
console.log(JSON.stringify(foo, null, 2));
