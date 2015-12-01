'use strict';
const controllers = require('../controllers');

exports = module.exports = (app) => {
  app.get('/', controllers.posts.index);
  app.get('/page/:page', controllers.posts.pagination);
  app.get('/posts/:id/:slug', controllers.posts.detail);
  app.get('/author/:username/posts', controllers.authors.posts);
  app.get('/author/:username/page/:page', controllers.authors.pagination);
};