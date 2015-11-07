'use strict';
const sentence = require('../sentence');
const utils = require('../utils');

const slugify = utils.slugify;

module.exports = (user) => {
  let title = null;
  let sentences = [];

  const createPost = () => {
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
      return post;
    }
  };

  const createBody = () => {
    while (sentences.length < user.policy) {
      sentence(user)
        .then((text) => {
          console.log('sentence', text);
          sentences.push(text);
          return createPost();
        })
        .catch((err) => {
          console.log('sentence error', err);
        });
    }
  };

  sentence(user)
    .then((text) => {
      console.log('title', text);
      title = text;
      return createBody();
    })
    .catch((err) => {
      console.log('title error', err);
    });
};