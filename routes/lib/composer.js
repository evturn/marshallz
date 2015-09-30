'use strict';

let Markov = require('markovchain').MarkovChain;

let Composer = {}

Composer.capitalize = function(wordList) {
  let tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z';
  });

  return tmpList[~~(Math.random()*tmpList.length)];
};

module.exports = function() {
  let fragment = new Markov({files: 'routes/lib/quotes.txt'});
  let compiled = new Promise(function(resolve, reject) {
    fragment
      .start(Composer.capitalize)
      .end()
      .process(function(err, sentence) {
        resolve(sentence);
      });
  });
  compiled.then(function(v) {
    return v
  });

  return compiled;
};