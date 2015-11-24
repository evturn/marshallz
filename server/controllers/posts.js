'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');

module.exports.index = (req, res, next) => {
  BlogPost
    .find({})
    .limit(20)
    .sort({ 'timestamp': 'desc' })
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      res.render('index', { posts: posts });
    });
};

module.exports.detail = (req, res, next) => {
  BlogPost
    .findById(req.params.id)
    .deepPopulate(['author'])
    .exec((err, post) => {
      if (err) { return (err); }
        res.render('detail', post);
    });
};

module.exports.pagination = (req, res, next) => {
  const loadPolicy = 20;
  const page = req.params.page;
  const start = loadPolicy * page;

  BlogPost
    .find({})
    .skip(start)
    .limit(loadPolicy)
    .sort({ 'timestamp': 'desc' })
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      res.json({ posts: posts });
  });
};
