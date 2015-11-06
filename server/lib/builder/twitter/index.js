'use strict';
const Markov = require('../markov-chain');
const twitter = require('../../../config/credentials').twitter;
const composer = require('../sentence');

module.exports = () => {
  let sentence = composer();

  return new Promise((resolve, reject) => {
    resolve(sentence);
  })
  .then((sentence) => {
    let endpoint = 'statuses/update';
    let params = { status: sentence };

    twitter.post(endpoint, params, (error, tweet, response) => {
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