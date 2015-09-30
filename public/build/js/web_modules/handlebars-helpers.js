'use strict';

let moment = require('moment'),
    _ = require('underscore'),
    utils = require('./utils');

module.exports = function() {

  let _helpers = {};

  _helpers.ts =  function(milliseconds) {
    let humanReadable = moment(milliseconds).unix();

    return humanReadable;
  };

  _helpers.eq = function(first, second, options) {
    if (options.hash.firstKey) {
        first = first[options.hash.firstKey];
    }
    if (options.hash.secondKey) {
        second = second[options.hash.secondKey];
    }
    if (options.hash.firstAppend) {
        first += '' + options.hash.firstAppend;
    }
    if (options.hash.secondAppend) {
        second += '' + options.hash.secondAppend;
    }
    if (first === second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  };

  _helpers.gt = function(first, second, options) {
    if (first > second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  };

  _helpers.lt = function(first, second, options) {
    if (first < second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  };

  _helpers.set = function() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    let key = args.shift();
    while (!this[key] && args.length) {
      this[key] = args.shift();
    }
    return '';
  };

  _helpers.log = function() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    args.unshift('handlebars log:');
    console.log.apply(console, args);
    return '';
  };

  return _helpers;

};