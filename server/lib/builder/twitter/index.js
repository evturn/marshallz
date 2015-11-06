'use strict';
const Markov = require('../markov-chain');
const twitterReq = require('../../../config/credentials').twitter;
const composer = require('../composer');

module.exports = function init() {
  let sentence = composer();

  return new Promise((resolve, reject) => {
    resolve(sentence);
  })
  .then((sentence) => {
    twitterReq.post('statuses/update', {status: sentence},
      (error, tweet, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log('=====TWEET POSTED=====');
          console.log(response);
          console.log('=====TWEET POSTED=====');
        }
      });
    return tweet;
  });
};