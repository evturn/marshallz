'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');

module.exports.posts = (req, res, next) => {
  Author
    .findOne({ 'username': req.params.username })
    .deepPopulate(['posts'])
    .exec((err, user) => {
      if (err) { return (err); }
        const posts = user.posts;
        const author = user;
        res.render('author/posts', { posts: posts, author: author });
    });
};

module.exports.bio = (req, res, next) => {
  Author
    .findOne({ 'username': req.params.username })
    .exec((err, author) => {
      if (err) { return (err); }
        res.render('author/bio', { author: author });
    });
};