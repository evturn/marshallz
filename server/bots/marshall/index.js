'use strict';
const Bot = require('../bot');
const Twitter = require('twitter');

const Marshall = new Bot({
  name: 'Marshall',
  username: 'marshall',
  avatar: 'av-marshall.png',
  index: 0,
  keywords: 'server/bots/marshall/keywords.txt',
  content: 'server/bots/marshall/content.txt',
  jobs: [
    {
      type: 'blog',
      crontab: '00 00,30 * * * *'
      // crontab: '* * * * * *'
    },{
      type: 'twitter',
      crontab: '00 00 01,04,07,10,13,16,22 * * *'
    }
  ],
  social: true,
  share: {
    twitter: 'https://twitter.com/marshallzBlog'
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

module.exports = Marshall.init();