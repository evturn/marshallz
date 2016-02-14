'use strict';
const Bot = require('../bot');
const Twitter = require('twitter');

const Marshall = new Bot({
  name: "Marshall",
  username: "marshall",
  avatar: "av-marshall.png",
  social: {
    twitter: "https://twitter.com/marshallzBlog"
  },
  _id: '563d8c95ade9d8510df8a25e',
  keywords: "server/bots/marshall/keywords.txt",
  filepath: "server/bots/marshall/content.txt",
  jobs: {
    twitter: "00 00 01,04,07,10,13,16,22 * * *",
    blog: "00 00,30 * * * *"
  },
  keys: {
    twitter: new Twitter({
      consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
    }),
    giphy: process.env.GIPHY_DEV
  }
});

module.exports = Marshall;