'use strict';
const Markov = require('markovchain').MarkovChain;

let capitalize = function(wordList) {
  let tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z';
  });

  return tmpList[~~(Math.random() * tmpList.length)];
};

module.exports = function() {
  let fragment = new Markov({files: 'server/lib/quotes.txt'});
  let compiled = new Promise(function(resolve, reject) {
    fragment
      .start(capitalize)
      .end()
      .process(function(err, sentence) {
        resolve(sentence);
      });
  });
  compiled.then(function(v) {
    return v;
  });

  return compiled;
};