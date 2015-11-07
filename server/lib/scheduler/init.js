'use strict';
const Author = require('../../models/author');
const toTwitter = require('../builder/twitter');
const toBlog = require('../builder/blog');

module.exports = (job) => {
  let publish;
  switch (job.media) {
    case 'blog':
      publish = toBlog;
      break;
    case 'twitter':
      publish = toTwitter;
      break;
  }

  Author.findOne({username: job.author}, (err, author) => {
    if (err) { return err; }
    return publish(author);
  });
};