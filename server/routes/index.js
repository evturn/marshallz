'use strict';
const controllers = require('../controllers');
const middleware = require('../controllers/middleware');

exports = module.exports = (app) => {
  app.get('/', controllers.posts.index);
  app.get('/pages', controllers.posts.pagination);
  app.get('/posts/:id/:slug', controllers.posts.detail);
  app.get('/author/:username/posts', controllers.authors.posts);
  app.get('/author/:username/bio', controllers.authors.bio);
};