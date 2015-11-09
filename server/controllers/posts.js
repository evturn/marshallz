'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');

module.exports.index = (req, res, next) => {
  BlogPost
    .find({})
    .limit(10)
    .sort({ timestamp: 'desc' })
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      res.render('index', { posts: posts, page: 2 });
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
  const page = req.query.page;
  const loadPolicy = 10;
  const start = loadPolicy * page;
  const increment = parseInt(page) + 1;

  BlogPost
    .find({})
    .skip(start)
    .limit(loadPolicy)
    .sort({ timestamp: 'desc' })
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      res.json({ posts: posts, page: increment });
  });
};