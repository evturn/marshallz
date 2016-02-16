'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SentenceGenerator = function () {
  function SentenceGenerator(props) {
    _classCallCheck(this, SentenceGenerator);

    this.files = this.assureDataType(props.files);
    this.wordCount = props.wordCount;
    this.wordTree = {};
    this.sentence = '';
  }

  _createClass(SentenceGenerator, [{
    key: 'init',
    value: function init() {
      var words = this.concatWordsToSentence();

      return Promise.all(words).then(function (value) {
        var _value = _slicedToArray(value, 1);

        var sentence = _value[0];


        return sentence;
      });
    }
  }, {
    key: 'concatWordsToSentence',
    value: function concatWordsToSentence() {
      var _this = this;

      return this.files.map(function (file) {
        return new Promise(function (resolve, reject) {
          _fs2.default.readFile(file, 'utf8', function (err, data) {
            if (err) {
              reject(err);
            }

            var currentWord = (0, _utils.capitalize)(_this.createWordTree(data));
            _this.sentence = currentWord;

            while (_this.wordTree[currentWord] && !_this.shouldStopWriting()) {
              currentWord = (0, _utils.select)(_this.wordTree[currentWord]);
              _this.sentence += ' ' + currentWord;
            }

            resolve(_this.sentence.trim());
          });
        });
      });
    }
  }, {
    key: 'shouldStopWriting',
    value: function shouldStopWriting() {
      return this.sentence.split(' ').length > this.wordCount - 2;
    }
  }, {
    key: 'createWordTree',
    value: function createWordTree(data) {
      var _this2 = this;

      (0, _utils.injectNewlines)(data.toString()).forEach(function (lines) {
        lines.split(' ').filter(function (word) {
          return word.trim() !== '';
        }).map(function (word, i, words) {
          var current = (0, _utils.normalize)(words[i]);
          var next = (0, _utils.normalize)(words[i + 1]);

          if (!_this2.wordTree[current]) {
            _this2.wordTree[current] = {};
          }

          if (!_this2.wordTree[current][next]) {
            _this2.wordTree[current][next] = 1;
          } else {
            _this2.wordTree[current][next] += 1;
          }
        });
      });

      return this.wordTree;
    }
  }, {
    key: 'assureDataType',
    value: function assureDataType(files) {
      if (typeof files === 'string') {
        return [files];
      } else if (typeof files === 'array') {
        return files;
      } else {
        throw new Error('File(s) must be string or array');
      }
    }
  }]);

  return SentenceGenerator;
}();

exports.default = SentenceGenerator;