const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const select = utils.select;
const normalize = utils.normalize;
const injectNewlines = utils.injectNewlines;
const capitalize = utils.capitalize;

class Statement {
  constructor(props) {
    this.files = this.assureDataType(props.files);
    this.wordCount = props.wordCount;
    this.wordTree = {};
    this.sentence = '';
  }
  init() {
    const words = this.concatWordsToSentence();

    return Promise.all(words).then(value => {
      const [sentence] = value;

      return sentence;
    });
  }
  concatWordsToSentence() {
    return this.files.map(file => {
      return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            reject(err);
          }

          let currentWord = capitalize(this.createWordTree(data));
          this.sentence = currentWord;

          while (this.wordTree[currentWord] && !this.shouldStopWriting()) {
            currentWord = select(this.wordTree[currentWord]);
            this.sentence += ' ' + currentWord;
          }

          resolve(this.sentence.trim());
        })
      })
    });
  }
  shouldStopWriting() {
    return this.sentence.split(' ').length > this.wordCount - 2;
  }
  createWordTree(data) {
    injectNewlines(data.toString()).forEach(lines => {
      lines
        .split(' ')
        .filter(word => word.trim() !== '')
        .map((word, i, words) => {
          let current = normalize(words[i]);
          let next = normalize(words[i + 1]);

          if (!this.wordTree[current]) {
            this.wordTree[current] = {};
          }

          if (!this.wordTree[current][next]) {
            this.wordTree[current][next] = 1;
          } else {
            this.wordTree[current][next] += 1;
          }
        });
    });

    return this.wordTree;
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

