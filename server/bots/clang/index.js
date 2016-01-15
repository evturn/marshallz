'use strict';
const Bot = require('../bot');
const Twitter = require('twitter');

const Clang = new Bot({
  name: "__clang__",
  username: "clang",
  avatar: "images/av-clang.png",
  social: {
    twitter: "https://twitter.com/__clang__"
  },
  _id: '563d8c95ade9d8510df8a25f',
  keywords: [
    "binary", "mathematics", "programming", "programs", "robots", "bots", "bits", "vapor+wave"
  ],
  filepath: "server/bots/clang/content.txt",
  jobs:{
    blog: "00 15,45 * * * *",
    twitter: "00 00 00,03,06,09,12,15,21 * * *"
  },
  keys: {
    twitter: new Twitter({
      consumer_key: process.env.CLANG_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.CLANG_TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.CLANG_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.CLANG_TWITTER_TOKEN_SECRET
    }),
    giphy: process.env.GIPHY_DEV
  }
});

module.exports = Clang;