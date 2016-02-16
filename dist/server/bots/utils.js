'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slugify = exports.confirmType = exports.select = exports.ofType = exports.capitalize = exports.random = exports.injectNewlines = exports.normalize = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalize = exports.normalize = function normalize(word) {
  if (word === undefined) {
    return '';
  }

  return word.replace(/\.$/ig, '');
};

var injectNewlines = exports.injectNewlines = function injectNewlines(file) {
  return file.split(/(?:\. |\n)/ig);
};

var random = exports.random = function random(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var capitalize = exports.capitalize = function capitalize(wordList) {
  var tmpList = Object.keys(wordList).filter(function (word) {
    return word[0] >= 'A' && word[0] <= 'Z';
  });

  return tmpList[~ ~(Math.random() * tmpList.length)];
};

var ofType = exports.ofType = function ofType(file) {
  return file.indexOf('.' + _path2.default.sep) === 0 || file.indexOf(_path2.default.sep) === 0;
};

var select = exports.select = function select(obj) {
  var keys = Object.keys(obj);
  var sum = keys.reduce(function (p, c) {
    return p + obj[c];
  }, 0);

  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value');
  }

  var select = ~ ~(Math.random() * sum);

  for (var i = 0, count = 0; i < keys.length; i++) {
    count += obj[keys[i]];
    if (count > select) {
      return keys[i];
    }
  }
};

var confirmType = exports.confirmType = function confirmType(file) {
  return Object.prototype.toString.call(file).slice(8, -1).toLowerCase();
};

var slugify = exports.slugify = function slugify(value) {

  var escapeForRegExp = function escapeForRegExp(value) {
    if (_.isUndefined(value)) {
      return '';
    }

    return value.toString().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  };

  var trim = function trim(value, chars) {
    chars = escapeForRegExp(chars);

    return value.replace(new RegExp('^(' + chars + ')+|(' + chars + ')+$', 'g'), '').toLowerCase();
  };

  var toSlug = function toSlug(value) {
    value = value || '';

    return value.trim().replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
  };

  return toSlug(value);
};