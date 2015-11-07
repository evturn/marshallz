'use strict';
const sentence = require('../sentence');
const utils = require('../utils');

const slugify = utils.slugify;

module.exports = class BlogPost {
  constructor(user) {
    this.user = user;
    this.title = null;
    this.sentences = [];
    this.policy = user.policy;

    this.getSentence();
  }
  getSentence() {
    sentence(this.user)
      .then((text) => {
        console.log('text', text);
        return this.allocate(text);
      })
      .catch((err) => {
        console.log('text', err);
      });
  }
  allocate(text) {
    if (title === null) {
      title = text;
    } else if (this.sentences.length < this.policy) {
      this.sentences.push(text);
      if (this.sentences.length === this.policy) {
        return this.createPost();
      }
    }
  }
  createPost() {
    return new Promise((resolve, reject) => {
      if (title !== null) {
        throw new Error('Blog post title still `null`');
      } else if (sentences.length !== user.policy) {
        throw new Error(`Blog post body needs ${user.policy} current has ${sentences.length}`);
      } else {
        const post = {
          title: title,
          body: sentences,
          author: user
        };
        console.log('post', post);
        resolve(post);
      }
    });
  }
};