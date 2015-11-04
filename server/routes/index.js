'use strict';
const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.index);
  app.get('/pages', controllers.page);
  app.get('/posts/:id/:slug', controllers.detail);
};