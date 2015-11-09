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

module.exports.author = (req, res, next) => {
  console.log(req.params.username);
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
      res.json({ posts: posts, page: increment });
  });
};