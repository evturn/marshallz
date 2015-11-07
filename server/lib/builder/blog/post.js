'use strict';
const sentence = require('../sentence');
const utils = require('../utils');

const slugify = utils.slugify;

module.exports = class Post {
  constructor(user) {
    this.user = user;
    this.title = null;
    this.sentences = '';
    this.length = 0;
    this.policy = user.policy;

    this.getSentence();
  }
  getSentence() {
    sentence(this.user)
      .then((text) => {
        // console.log('text', text);
        return this.allocate(text);
      })
      .catch((err) => {
        console.log('text', err);
      });
  }
  allocate(text) {
    if (this.title === null) {
      this.title = text;
      return this.getSentence();
    } else if (this.length < this.policy) {
      this.sentences = `${this.sentences}. ${text}.`;
      this.length =+ 1;
      if (this.length < this.policy) {
        return this.getSentence();
      } else {
        return this.createPost()
      }
    }
  }
  createPost() {
    if (this.title !== null) {
      throw new Error('Blog post title still `null`');
    } else if (this.sentences.length !== this.policy) {
      throw new Error(`Blog post body needs ${this.policy} current has ${this.sentences.length}`);
    } else {
      return new Promise((resolve, reject) => {
        const post = {
          title: this.title,
          body: this.sentences,
          author: this.user
        };
        // console.log('post', post);
        return resolve(post);
      });
    }
  }
};