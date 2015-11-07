'use strict';
const twitter = require('../../../config/credentials').twitter;
const sentence = require('../sentence');

module.exports = class Tweet {
  constructor(author) {
    this.author = author;
    this.request = twitter[author.username];

    this.getSentence();
  }
  getSentence() {
    sentence(this.author)
      .then((text) => {
        return this.validate(text);
      })
      .catch((err) => {
        console.log('text', err);
      });
  }
  validate(text) {
    if (text.length <= 140) {
      this.status = text;
      return this.postTweet();
    } else {
      return this.getSentence();
    }
  }
  postTweet() {
    const endpoint = 'statuses/update';
    const params = { status: this.status };

    this.request.post(endpoint, params, (error, tweet, response) => {
      if (error) { return error; }
      console.log(JSON.parse(response.body));
      return tweet;
    });
  }
};
