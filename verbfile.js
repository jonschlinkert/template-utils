'use strict';

var verb = require('verb');
// var escaper = require('./lib/middleware/escape');
// verb.route(/\.*/).before(escaper.escape(verb));
// verb.route(/\.*/).after(escaper.unescape(verb));
// // temporary data used in fixtures
// verb.data({foo: 'bar'});


verb.task('readme', function() {
  verb.src('.verb.md')
    .pipe(verb.dest('./'));
});

verb.task('default', ['readme']);
// console.log(verb);