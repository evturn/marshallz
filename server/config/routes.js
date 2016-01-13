/**
 * Routes for express app
 */
var blogPosts = require('../controllers/blogPosts');
var topics = require('../controllers/topics');
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');
var App = require('../../public/assets/app.server');

module.exports = function(app, passport) {
  app.get('/blogPost', blogPosts.all);

  app.get('*', function (req, res, next) {
    App(req, res);
  });

};;
