'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _marshall = require('./marshall');

var _marshall2 = _interopRequireDefault(_marshall);

var _clang = require('./clang');

var _clang2 = _interopRequireDefault(_clang);

var _borf = require('./borf');

var _borf2 = _interopRequireDefault(_borf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_marshall2.default, _clang2.default, _borf2.default].map(function (bot) {
  return bot;
});