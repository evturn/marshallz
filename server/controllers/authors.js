'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');

module.exports.posts = (req, res, next) => {
  const username = { 'username': req.params.username };
  Author.findOne(username, ((err, author) => {
    const opts = [{
      path: 'posts',
      options: { limit: 5, sort: { 'timestamp': 'desc' } }
    }];
    Author.populate(author, opts, (err, author) => {
      res.render('author', { author: author });
    });
  }));
};

module.exports.bio = (req, res, next) => {
  Author
    .findOne({ 'username': req.params.username })
    .exec((err, author) => {
      if (err) { return (err); }
        res.render('author', { author: author });
    });
};

module.exports.pagination = (req, res, next) => {
  const loadPolicy = 5;
  const page = req.params.page;
  const start = loadPolicy * page;
  const username = { 'username': req.params.username };
  Author.findOne(username, ((err, author) => {
    const opts = [{
      path: 'posts',
      options: { limit: 5, skip: start, sort: { 'timestamp': 'desc' } }
    }];
    Author.populate(author, opts, (err, author) => {
      res.json({ author: author });
    });
  }));
};