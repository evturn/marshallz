'use strict';
const url = require('url');
const _ = require('underscore');
const Author = require('../models/author');
const BlogPost = require('../models/blog-post');

const activePage = (req, res, next) => {
  const urlStr = url.parse(req.originalUrl);
  const pathname = urlStr.pathname;
  const route = pathname[0] === '/' ? pathname.substr(1) : pathname;
  const pos = route.indexOf('/');
  const firstPath = route.slice(0, pos);
  res.locals.activePage = firstPath ? firstPath : 'home';
  next();
};

const author = (req, res, next) => {
  Author
    .find({})
    .exec((err, authors) => {
      res.locals.authors = authors;
      next();
    });
};

const middleware = [activePage, author];

module.exports = (app) => {
  for (let fn of middleware) {
    app.use(fn);
  }
};