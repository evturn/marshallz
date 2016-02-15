'use strict';
const Bot = require('../bot');

const Borf = new Bot({
  name: 'b0rf',
  username: 'borf',
  avatar: 'av-borf.png',
  index: 2,
  keywords: 'server/bots/borf/keywords.txt',
  filepath: 'server/bots/borf/content.txt',
  social: false,
  jobs:{
    blog: '30 07,53 * * * *'
  },
  keys: {
    giphy: process.env.GIPHY_DEV
  }
});

module.exports = Borf;