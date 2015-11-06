'use strict';
const select = require('./utils').select;
const confirmType = require('./utils').confirmType;

module.exports = class MarkovChain {
  constructor(contents) {
    this.bank = {};
    this.sentence = '';
    this.parse(contents);
  }
  startFn(wordList) {
    let k = Object.keys(wordList);
    let l = k.length;
    return k[~~(Math.random()*l)];
  }
  endFn() {
    return this.sentence.split(' ').length > 7;
  }
  process() {
    let curWord = this.startFn(this.bank);
    this.sentence = curWord;

    while (this.bank[curWord] && !this.endFn()) {
      curWord = select(this.bank[curWord]);
      this.sentence += ' ' + curWord;
    }
    return this.sentence;
  }
  parse(text) {
    let line = text ? text : '';
    line.split(/(?:\. |\n)/ig).forEach((lines) => {
      let words = lines.split(' ').filter((w) => {
        return w.trim() !== '';
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
    return this;
  }
  start(fnStr) {
    const startType = confirmType(fnStr);

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
    const endType = confirmType(fnStrOrNum);

    if (endType === 'function') {
      this.endFn = () => {
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