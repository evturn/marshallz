'use strict';
const controllers = require('../controllers');
const middleware = require('../controllers/middleware');

exports = module.exports = (app) => {
  app.get('/', controllers.index);
  app.get('/pages', controllers.page);
  app.get('/posts/:id/:slug', controllers.detail);
  app.get('/author/:username/posts', controllers.author);
};