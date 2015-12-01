'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');
const app = require('../config');
const loadPolicy = app.get('loadPolicy');

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


const state = {
  totalCount: 400,
  page: null,
  pages: null,
  start: null,
  end: null,
  init: function() {
    BlogPost.find({}, (err, posts) => {
      this.totalCount = posts.length;
    });
  },
};

// state.init();

module.exports.pagination = (req, res, next) => {
  state.page = parseInt(req.params.page);
  state.start = loadPolicy * state.page;
  state.end = state.start + loadPolicy;
  state.pages = Math.ceil(state.totalCount / loadPolicy);

  BlogPost
    .find({})
    .skip(state.start)
    .limit(loadPolicy)
    .sort({ 'timestamp': 'desc' })
    .deepPopulate(['author'])
    .exec((err, posts) => {
      if (err) { return (err); }
      const response = {};

      response.posts = posts;
      if (state.page === state.pages) {
        response.message = `That's all for today.`;
      }
      res.json(response);
  });
};
