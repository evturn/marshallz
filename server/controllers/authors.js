'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');
const app = require('../config');
const loadPolicy = app.get('loadPolicy');

module.exports.posts = (req, res, next) => {
  const username = { 'username': req.params.username };
  Author.findOne(username, ((err, author) => {
    const opts = [{
      path: 'posts',
      options: { limit: loadPolicy, sort: { 'timestamp': 'desc' } }
    }];
    Author.populate(author, opts, (err, author) => {
      res.render('author', { author: author });
    });
  }));
};

const state = {
  totalCount: null,
  page: null,
  pages: null,
  start: null,
  end: null,
  username: null,
  init: function(username) {
    if (this.username === username) {
      return Promise.resolve(this.totalCount);
    } else {
      this.username = username;
      return new Promise((resolve, reject) => {
        Author.findOne(this.username, (err, author) => {
          resolve(author.posts.length);
        });
      });
    }
  },
};

module.exports.pagination = (req, res, next) => {
  state.init({ username: req.params.username })

    .then((totalCount) => {
      state.totalCount = totalCount;
      state.page = parseInt(req.params.page);
      state.start = loadPolicy * state.page;
      state.end = state.start + loadPolicy;
      state.pages = Math.ceil(state.totalCount / loadPolicy);
      return state;
    })

    .then((state) => {
      Author.findOne(state.username, ((err, author) => {
        const opts = [{
          path: 'posts',
          options: {
            limit: loadPolicy,
            skip: state.start,
            sort: { 'timestamp': 'desc' }
          }
        }];
        Author.populate(author, opts, (err, author) => {
          if (err) { return (err); }
          const response = {};

          response.author = author;
          if (state.page >= state.pages) {
            response.message = `That's all for today.`;
          }
          res.jsonp(response);
        });
      }));
    })

    .catch((err) => console.log(err));
};