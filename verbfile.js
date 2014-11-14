'use strict';

var verb = require('verb');
verb.data({foo: 'bar'});

verb.task('readme', function() {
  verb.src('.verb.md')
    .pipe(verb.dest('./'));
});

verb.task('default', ['readme']);
