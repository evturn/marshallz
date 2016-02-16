'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bot = require('../bot');

var _bot2 = _interopRequireDefault(_bot);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _bot2.default({
  name: 'Marshall',
  username: 'marshall',
  avatar: 'av-marshall.png',
  index: 0,
  keywords: 'src/server/bots/marshall/keywords.txt',
  content: 'src/server/bots/marshall/content.txt',
  jobs: [{
    type: 'blog',
    crontab: '00 00,30 * * * *'
  }, {
    type: 'twitter',
    crontab: '00 00 01,04,07,10,13,16,22 * * *'
  }],
  social: true,
  share: {
    twitter: 'https://twitter.com/marshallzBlog'
  },
  keys: {
    twitter: new _twitter2.default({
      consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
    }),
    giphy: process.env.GIPHY_DEV
  }
});