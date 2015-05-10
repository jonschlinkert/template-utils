# template-utils [![NPM version](https://badge.fury.io/js/template-utils.svg)](http://badge.fury.io/js/template-utils)  [![Build Status](https://travis-ci.org/jonschlinkert/template-utils.svg)](https://travis-ci.org/jonschlinkert/template-utils)

> Utils for [Template](https://github.com/jonschlinkert/template), and Template-based applications.

## Install

Install with [npm](https://www.npmjs.com/)

```bash
npm i template-utils --save
```

## Table of contents

<!-- toc -->

* [Usage](#usage)
* [API](#api)
* [Related projects](#related-projects)
* [Running tests](#running-tests)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb])_

<!-- tocstop -->

## Usage

```js
var utils = require('template-utils');
```

## API

### [.loaders.file](lib/loaders/file.js#L15)

Vinyl file loader. Used in plugins to load vinyl
files onto `app.views`.

**Params**

* `file` **{Object}**: Vinyl file object
* `returns` **{Object}**: Template object

### [.toTemplate](lib/utils/index.js#L31)

Convert a Vinyl file object to a non-vinyl template object.

**Params**

* `file` **{Object}**: Vinyl file object
* `returns` **{Object}**: Object with properties expected by Template or Template apps

**Example**

```js
var template = utils.toTemplate(file);
```

### [.toVinyl](lib/utils/index.js#L46)

Convert a `template` object to a Vinyl file object.

**Params**

* `file` **{Object}**: Object with properties expected by Template
* `returns` **{Object}**: Vinyl file object

**Example**

```js
var file = utils.toVinyl(template);
```

### [.isVinyl](lib/utils/index.js#L62)

Returns true if a file is a vinyl file object.

**Params**

* `file` **{Object}**: Object to test.
* `Vinyl` **{Object}**: Optionally pass an instance of [vinyl]
* `returns` **{Boolean}**: Returns true if it's a vinyl file.

**Example**

```js
var file = utils.isVinyl(file);
```

### [.pushToStream](lib/utils/index.js#L101)

Push a collection of templates into the stream as vinyl files.

**Params**

* `collection` **{Object}**: Template collection
* `stream` **{Stream}**: Stream to push the files into

**Example**

```js
module.exports = function myPlugin(app) {
  var id = app.getTask();
  // create a template type for vinyl files and assign the `task` loader
  if (!app.hasOwnProperty(id)) {
    app.create(id, ['task']);
  }
  return through.obj(function (file, enc, cb) {
    // Convert vinyl file to template and add to collection
    app[id](file);
    cb();
  }, function (cb) {
    // Get the cached template and push into stream
    app.pushToStream(id, this);
    cb();
  });
};
```

### [.bindAll](lib/utils/index.js#L125)

Bind a `thisArg` to all the functions on the target
array of object.

**Params**

* `target` **{Object|Array}**: Object or Array with functions as values that will be bound.
* `thisArg` **{Object}**: Object to bind to the functions
* `returns` **{Object|Array}**: Object or Array with bound functions.

### [.basename](lib/utils/index.js#L170)

Get the basename of a file path, excluding extension.

**Params**

* `fp` **{String}**
* `ext` **{String}**: Optionally pass the extension.

**Example**

```js
utils.basename('a/b/c.hbs');
//=> 'c'
```

### [.renameKey](lib/utils/index.js#L198)

Rename a filepath to use as the key for caching templates.

**Params**

* `fp` **{String}**
* `opts` **{String}**: Optionally pass `options.cwd`.

**Example**

```js
utils.renameKey('a/b/c/d/e/f.md', {last: 2});
//=> 'e/f.md'

utils.renameKey('a/b/c/d/e/f.md', {last: 3});
//=> 'c/d/e/f.md'

utils.renameKey('a/b/c/d/e/f.md', {last: 1, ext: false});
//=> 'f'
```

### [.getExt](lib/utils/index.js#L232)

Get the extension from a string or from the first string in an array of file paths.

**Params**

* `val` **{String|Array}**: Filepath or array of filepaths

**Example**

```js
utils.getExt('a/b/c.hbs');
//=> '.hbs'

utils.getExt(['a/b/c.hbs', 'x/y/z.hbs']);
//=> '.hbs'
```

### [.formatExt](lib/utils/index.js#L258)

Ensure file extensions are formatted properly for lookups.

**Params**

* `ext` **{String}**: File extension
* `returns` **{String}**

**Example**

```js
utils.formatExt('hbs');
//=> '.hbs'

utils.formatExt('.hbs');
//=> '.hbs'
```

### [.stripDot](lib/utils/index.js#L281)

Strip the dot from a file extension

**Params**

* `ext` **{String}**: extension
* `returns` **{String}**

**Example**

```js
utils.stripDot('.hbs');
//=> 'hbs'
```

### [.exts](lib/utils/index.js#L303)

Sanitize an array of extensions before converting them to regex.

This is used by the `extensionRe()` util for creating
a regex to match the given file extensions.

**Params**

* `extensions` **{Array}**: Array of file extensions
* `returns` **{Array}**

### [.extensionRe](lib/utils/index.js#L325)

Creates a regex to match only the file extensions of registered engines.

This is used by the default middleware to prevent unregistered
extensions from being processed.

**Params**

* `str` **{String}**
* `returns` **{RegExp}**

### [.arrayify](lib/utils/index.js#L348)

Cast `value` to an array.

**Params**

* `value` **{Array|String}**
* `returns` **{Array}**

**Example**

```js
utils.arrayify('abc');
//=> ['abc']

utils.arrayify(['abc']);
//=> ['abc']
```

### [.headings](lib/utils/index.js#L373)

Adjust markdown heading levels.

Adds one heading level next to all markdown headings to make
them correct within the scope of the inheriting document.
_Headings in fenced code blocks are skipped_.

**Params**

* `str` **{String}**: Markdown string with headings to format.
* `returns` **{String}**

**Example**

```js
utils.heading(str);
```

## Related projects

* [middleware-utils](https://github.com/jonschlinkert/middleware-utils): Utils for Template middleware.
* [template](https://github.com/jonschlinkert/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://github.com/jonschlinkert/template)

## Running tests

Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/template-utils/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright (c) 2014-2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT](https://github.com/jonschlinkert/template-utils/blob/master/LICENSE) license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 10, 2015._