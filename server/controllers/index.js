'use strict';
const BlogPost = require('../models/blog-post');

module.exports.index = (req, res, next) => {
  BlogPost
    .find({})
    .limit(10)
    .sort({timestamp: 'desc'})
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      res.render('index', {posts: posts, page: 2});
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

module.exports.page = (req, res, next) => {
  let page = req.query.page,
      count = 5,
      start = count * page,
      increment = parseInt(page) + 1;

  BlogPost
    .find({})
    .skip(start)
    .limit(count)
    .sort({timestamp: 'desc'})
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      res.json({posts: posts, page: increment});
  });
};