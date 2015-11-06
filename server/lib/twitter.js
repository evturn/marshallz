'use strict';

const Markov = require('markovchain').MarkovChain,
    twitterReq = require('../config/credentials').twitter,
    composer = require('./composer');

module.exports = function init() {
  let sentence = composer();

  return new Promise(function(resolve, reject) {
    resolve(sentence);
  })
  .then(function(v) {
    let string = v;
    twitterReq.post('statuses/update', {status: string},
      function(error, tweet, response) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(response);
            console.log('=====================');
            console.log('=====SUCCESSFULL=====');
            console.log('=====================');
        }
      });
    return tweet;
  });
};