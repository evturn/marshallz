'use strict';
const async = require('async');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');

class Statement {
constructor(args) {
    if (!args) {
      args = {};
    }

    this.bank = {};
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
    if (utils.confirmType(files) === 'array') {
      this.files = files;
    } else if (utils.confirmType(files) === 'string') {
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
          if (err.code === 'ENOENT' && !utils.ofType(file)) {
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

    for (let prop in this.bank[word]) {
      if (this.bank[word].hasOwnProperty(prop)) {
        total += this.bank[word][prop];
      }
    }
    return total;
  }
  runProcess(callback) {
    const readFiles = this.files.map(file => this.readFile(file));

      async.parallel(readFiles, (err, retFiles) => {
        let words, curWord;

        this.parseFile(retFiles.toString());
        curWord = this.startFn(this.bank);
        this.sentence = curWord;

        while (this.bank[curWord] && !this.endFn()) {
          curWord = utils.select(this.bank[curWord]);
          this.sentence += ' ' + curWord;
        }

        callback(null, this.sentence.trim());
      });
  }
  parseFile(file) {
    file.split(/(?:\. |\n)/ig).forEach((lines) => {
      let words = lines.split(' ').filter((w) => {
        return (w.trim() !== '');
      });

      for (let i = 0; i < words.length - 1; i++) {
        let curWord = this.normalize(words[i]);
        let nextWord = this.normalize(words[i + 1]);

        if (!this.bank[curWord]) {
          this.bank[curWord] = {};
        }
        if (!this.bank[curWord][nextWord]) {
          this.bank[curWord][nextWord] = 1;
        } else {
          this.bank[curWord][nextWord] += 1;
        }
      }
    });
  }
  start(fnStr) {
    let startType = utils.confirmType(fnStr);

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
    let endType = utils.confirmType(fnStrOrNum);

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
}

module.exports = Statement;

