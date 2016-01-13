'use strict';
const blogPosts = require('../controllers/blogPosts');
const bots = require('../controllers/bots');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const App = require('../../public/assets/app.server');

module.exports = function(app, passport) {
  app.get('/blogPost', blogPosts.all);
  app.get('/bot', bots.all);

  app.get('*', function (req, res, next) {
    App(req, res);
  });
};;
