'use strict';

var chalk = require('chalk');

module.exports = function handleError(template, methodName) {
  return function (err) {
    if (err) {
      console.error(chalk.red('Error running `' + methodName + '` middleware for: %j', template));
      console.error(chalk.red(err));
    }
  };
};
