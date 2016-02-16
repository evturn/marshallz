'use strict';
const async = require('async');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const normalize = utils.normalize;
const injectNewlines = utils.injectNewlines;
const capitalize = utils.capitalize;

class Statement {
constructor(props) {
    if (!props) {
      props = {};
    }
    this.files = this.assureDataType(props.files);
    this.wordCount = props.wordCount
    this.bank = {};
    this.sentence = '';
  }
  shouldStopWriting() {
    return this.sentence.split(' ').length > this.wordCount - 2;
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

        process.nextTick(() => callback(null, data));
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
  init() {
    const words = this.files.map(file => {
      return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.log(err);
          }
          let words, currentWord;

          this.createWordTree(data.toString());
          currentWord = capitalize(this.bank);
          this.sentence = currentWord;

          while (this.bank[currentWord] && !this.shouldStopWriting()) {
            currentWord = utils.select(this.bank[currentWord]);
            this.sentence += ' ' + currentWord;
          }

          resolve(this.sentence.trim());
        })
      })
    });

    return Promise.all(words).then(v => {
      const [sentence] = v

      return sentence;
    });
  }
  runProcess(callback) {
    const readFiles = this.files.map(file => this.readFile(file));

      async.parallel(readFiles, (err, results) => {
        let words, currentWord;

        this.createWordTree(results.toString());
        currentWord = capitalize(this.bank);
        this.sentence = currentWord;

        while (this.bank[currentWord] && !this.shouldStopWriting()) {
          currentWord = utils.select(this.bank[currentWord]);
          this.sentence += ' ' + currentWord;
        }

        callback(null, this.sentence.trim());
      });
  }
  createWordTree(file) {
    injectNewlines(file).forEach(lines => {
      lines
        .split(' ')
        .filter(word => word.trim() !== '')
        .map((word, i, words) => {
          let current = normalize(words[i]);
          let next = normalize(words[i + 1]);

          if (!this.bank[current]) {
            this.bank[current] = {};
          }

          if (!this.bank[current][next]) {
            this.bank[current][next] = 1;
          } else {
            this.bank[current][next] += 1;
          }
        });
    });
  }
  assureDataType(files) {
    if (typeof files === 'string') {
      return [files];
    } else if (typeof files === 'array') {
      return files;
    } else  {
      throw new Error('File(s) must be string or array');
    }
  }
}

module.exports = Statement;

