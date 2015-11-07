'use strict';
const Markov = require('./markov-chain');
const capitalize = require('./utils').capitalize;

module.exports = (user) => {
  return new Promise((resolve, reject) => {
    return new Markov({files: user.filepath})
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