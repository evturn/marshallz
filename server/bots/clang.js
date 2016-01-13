'use strict';
const Cron = require('cron').CronJob;
const Author = require('./author');
const Twitter = require('twitter');

const Clang = new Author({
  name: "__clang__",
  username: "clang",
  avatar: "images/av-clang.png",
  filepath: "server/bots/clang.txt",
  post: function() {
    return new Cron(this.jobs.twitter, () => this.postToTwitter(), null, true);
  },
  jobs:{
    blog: "00 15,45 * * * *",
    twitter: "00 00 00,03,06,09,12,15,21 * * *"
  },
  social: {
    twitter: "https://twitter.com/__clang__"
  },
  keys: {
    twitter: new Twitter({
      consumer_key: process.env.CLANG_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.CLANG_TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.CLANG_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.CLANG_TWITTER_TOKEN_SECRET
    }),
    giphy: process.env.GIPHY_DEV
  },
  policy: 4,
  keywords: [
    "binary", "mathematics", "programming", "programs", "robots", "bots", "bits", "vapor+wave"
  ]
});

module.exports = Clang;