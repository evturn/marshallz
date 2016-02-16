'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bot = require('../bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _bot2.default({
  name: 'b0rf',
  username: 'borf',
  avatar: 'av-borf.png',
  index: 2,
  keywords: 'server/bots/borf/keywords.txt',
  content: 'server/bots/borf/content.txt',
  social: false,
  jobs: [{
    type: 'blog',
    crontab: '30 07,53 * * * *'
  }],
  keys: {
    giphy: process.env.GIPHY_DEV
  }
});