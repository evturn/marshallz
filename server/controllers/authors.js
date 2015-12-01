'use strict';
const BlogPost = require('../models/blog-post');
const Author = require('../models/author');
const paginate = require('../lib/pagination');
const app = require('../config');
const loadPolicy = app.get('loadPolicy');
const loadLimit = app.get('loadLimit');
const pg = paginate();

module.exports.posts = (req, res, next) => {
  const username = { 'username': req.params.username };
  Author.findOne(username, ((err, author) => {
    const opts = [{
      path: 'posts',
      options: {
        limit: loadPolicy,
        sort: { 'timestamp': 'desc' }
      }
    }];
    Author.populate(author, opts, (err, author) => {
      res.render('author', { author: author });
    });
  }));
};

module.exports.pagination = (req, res, next) => {
    const username = { username: req.params.username };

    pg.inate(req.params.page);
    Author.findOne(username, ((err, author) => {
      const opts = [{
        path: 'posts',
        options: {
          limit: pg.limit,
          skip: pg.start,
          sort: { 'timestamp': 'desc' }
        }
      }];
      Author.populate(author, opts, (err, author) => {
        if (err) { return (err); }
        const response = {};

        pg.hasEnded(response);
        response.author = author;
        res.json(response);
      });
    }));

};