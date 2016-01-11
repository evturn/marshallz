'use strict';
const Tweet = require('./tweet');

module.exports = (author) => {
  return new Tweet(author);
};