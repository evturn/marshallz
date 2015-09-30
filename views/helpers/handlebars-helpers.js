(function() {
  let root = this;
  let Handlebars;
  let moment;
  let _;
  let utils;

  if (typeof module !== 'undefined' && module.exports) {
      Handlebars = require('handlebars');
      moment = require('moment');
      _ = require('underscore');
      util = require('./util');
  }
  else {
      Handlebars = root.Handlebars;
      moment = root.moment;
      _ = root._;
      utils = root.util;
  }

  Handlebars.registerHelper('eq', function(first, second, options) {
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
  });

  Handlebars.registerHelper('gt', function(first, second, options) {
    if (first > second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  });

  Handlebars.registerHelper('lt', function(first, second, options) {
    if (first < second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  });

  Handlebars.registerHelper('set', function() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    let key = args.shift();
    while (!this[key] && args.length) {
      this[key] = args.shift();
    }
    return '';
  });

  Handlebars.registerHelper('log', function() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    args.unshift('handlebars log:');
    console.log.apply(console, args);
    return '';
  });

})();