'use strict';
const Markov = require('./markov-chain');
const capitalize = require('./utils').capitalize;
const filepath = 'server/lib/builder/quotes.txt';

module.exports = () => {
  return new Promise((resolve, reject) => {
    return new Markov({files: filepath})
      .start(capitalize)
      .end()
      .runProcess((err, sentence) => {
        if (err) {
          console.log(err);
        }
        resolve(sentence);
      });
  });
};