'use strict';
const moment = require('./moment.isoduration');
const _ = require('underscore');
const Handlebars = require('handlebars');
const utils = require('./utils');

const precompiled = module.exports.precompiled = {
  ts(milliseconds) {
    let humanReadable = moment(milliseconds).unix();
    return humanReadable;
  },
  eq(first, second, options) {
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
  },
  ne(first, second, options) {
    if (options.hash.roundDate) {
      options.hash.round = options.hash.roundDate;
      first = new Date(first).getTime();
      second = new Date(second).getTime();
    }
  
    if (options.hash.round) {
      first = Math.round(first / options.hash.round);
      second = Math.round(second / options.hash.round);
    }
    if (first !== second) {
      return options.fn(this);
    }
    else {
      return options.inverse(this);
    }
  },
  gt(first, second, options) {
    if (first > second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  },
  lt(first, second, options) {
    if (first < second) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
  },
  set() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    let key = args.shift();
    while (!this[key] && args.length) {
      this[key] = args.shift();
    }
    return '';
  },
  log() {
    let args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    console.log.apply(console, args);
    args.unshift('========HANDLEB0RS=========');
    return '';
  },
  eachUpTo(ary, max, options) {
    if(!ary || ary.length === 0) {
      return options.inverse(this);
    }
    let result = [ ];
    let data = null;
    for(var i = 0; i < max && i < ary.length; ++i) {
      data = Handlebars.createFrame(options.data || {});
      data.upto_index = i;
      data.upto_index_from_1 = (i + 1);
  
      if (options.hash) {
        _.extend(data, options.hash);
      }
  
      result.push(options.fn(ary[i], { data:data }));
    }
  
    return result.join('');
  }
};
