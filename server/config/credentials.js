'use strict';
const Twitter = require('twitter');

module.exports.twitter = new Twitter({
  consumer_key        : process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
  consumer_secret     : process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
  access_token_key    : process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
  access_token_secret : process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
});

module.exports.giphy = process.env.GIPHY_DEV;