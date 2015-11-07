'use strict';
const request = require('request');
const credentials = require('../../../config/credentials');
const utils = require('../utils');

const random = utils.random;

module.exports = (user) => {
  const query = random(user.keywords);
  const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${credentials.giphy}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const parsed = JSON.parse(body);
        if (parsed.data.length) {
          const item = random(parsed.data);
          resolve(item.images.original.url);
        }
      }
    });
  });
};