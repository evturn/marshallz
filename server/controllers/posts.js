'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');
const app = require('../config');
const loadPolicy = app.get('loadPolicy');
const paginate = require('../lib/pagination');
const pg = paginate();

module.exports.index = (req, res, next) => {
  BlogPost
    .find({})
    .limit(loadPolicy)
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
  pg.inate(req.params.page);

  BlogPost
    .find({})
    .skip(pg.start)
    .limit(pg.limit)
    .sort({ 'timestamp': 'desc' })
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      const response = {};

      pg.hasEnded(response);
      response.posts = posts;
      res.json(response);
  });
};
