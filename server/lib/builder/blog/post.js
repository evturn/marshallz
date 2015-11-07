'use strict';
const sentence = require('../sentence');
const utils = require('../utils');

const slugify = utils.slugify;

module.exports = class Post {
  constructor(author) {
    this.author = author;
    this.title = null;
    this.sentences = '';
    this.length = 0;
    this.policy = author.policy;

    this.getSentence();
  }
  getSentence() {
    sentence(this.author)
      .then((text) => {
        return this.allocate(text);
      })
      .catch((err) => {
        console.log('text', err);
      });
  }
  allocate(text) {
    if (this.title === null) {
      this.title = text;
      this.slug = slugify(text);
      return this.getSentence();
    } else if (this.length < this.policy) {
      let punc = text.endsWith('?') ? '' : '.';
      this.sentences = `${this.sentences} ${text}${punc}`;
      this.length += 1;
      if (this.length < this.policy) {
        return this.getSentence();
      }
      if (this.length === this.policy) {
        this.timestamp = Date.now();
        return this.createPost();
      }
    }
  }
  createPost() {
    if (this.title === null) {
      throw new Error('Blog post title still `null`');
    } else if (this.length !== this.policy) {
      throw new Error(`Blog post body needs ${this.policy} current has ${this.length}`);
    } else {
      return new Promise((resolve, reject) => {
        const post = {
          title: this.title,
          body: this.sentences,
          author: this.author,
          timestamp: this.timestamp
        };
        return resolve(post);
      });
    }
  }
};