'use strict';
const select = require('./utils').select;
const confirmType = require('./utils').confirmType;
const ofType = require('./utils').ofType;
const async = require('async');
const path = require('path');
const fs = require('fs');


module.exports = class MarkovChain {
  constructor(args) {
    if (!args) {
      args = {};
    }
    this.wordBank = {};
    this.sentence = '';
    this.files = [];
    if (args.files) {
      return this.use(args.files);
    }

    this.startFn = function(wordList) {
      let k = Object.keys(wordList);
      let l = k.length;

      return k[~~(Math.random()*l)];
    };

    this.endFn = function() {
      return this.sentence.split(' ').length > 7;
    };
    return this;
  }
  use(files) {
    if (confirmType(files) === 'array') {
      this.files = files;
    } else if (confirmType(files) === 'string') {
      this.files = [files];
    } else {
      throw new Error('Need to pass a string or array for use()');
    }
    return this;
  }
  readFile(file) {
    return (callback) => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT' && !ofType(file)) {
            return callback(null, file);
          }
          return callback(err);
        }
        process.nextTick(() => {
          callback(null, data);
        });
      });
    };
  }

  countTotal(word) {
    let total = 0;

    for (let prop in this.wordBank[word]) {
      if (this.wordBank[word].hasOwnProperty(prop)) {
        total += this.wordBank[word][prop];
      }
    }
    return total;
  }

  runProcess(callback) {
    let readFiles = [];

    this.files.forEach((file) => {
      readFiles.push(this.readFile(file));
    });

    async.parallel(readFiles, (err, retFiles) => {
      let words, curWord;

      this.parseFile(retFiles.toString());
      curWord = this.startFn(this.wordBank);
      this.sentence = curWord;

      while (this.wordBank[curWord] && !this.endFn()) {
        curWord = select(this.wordBank[curWord]);
        this.sentence += ' ' + curWord;
      }
      callback(null, this.sentence.trim());
    });
    return this;
  }
  parseFile(file) {
    file.split(/(?:\. |\n)/ig).forEach((lines) => {
      let words = lines.split(' ').filter((w) => {
        return (w.trim() !== '');
      });

      for (let i = 0; i < words.length - 1; i++) {
        let curWord = this.normalize(words[i]);
        let nextWord = this.normalize(words[i + 1]);

        if (!this.wordBank[curWord]) {
          this.wordBank[curWord] = {};
        }
        if (!this.wordBank[curWord][nextWord]) {
          this.wordBank[curWord][nextWord] = 1;
        } else {
          this.wordBank[curWord][nextWord] += 1;
        }
      }
    });
  }
  start(fnStr) {
    let startType = confirmType(fnStr);

    if (startType === 'string') {
      this.startFn = () => {
        return fnStr;
      };
    } else if (startType === 'function') {
      this.startFn = (wordList) => {
        return fnStr(wordList);
      };
    } else {
      throw new Error('Must pass a function, or string into start()');
    }
    return this;
  }
  end(fnStrOrNum) {
    let endType = confirmType(fnStrOrNum);

    if (endType === 'function') {
      this.endFn = function() {
        return fnStrOrNum(this.sentence);
      };
    } else if (endType === 'string') {
      this.endFn = () => {
        return this.sentence.split(' ').slice(-1)[0] === fnStrOrNum;
      };
    } else if (endType === 'number' || fnStrOrNum === undefined) {
      fnStrOrNum = fnStrOrNum || Infinity;
      this.endFn = () => {
        return this.sentence.split(' ').length > fnStrOrNum;
      };
    } else {
      throw new Error('Must pass a function, string or number into end()');
    }
    return this;
  }
  normalize(word) {
    return word.replace(/\.$/ig, '');
  }
};