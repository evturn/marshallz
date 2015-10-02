'use strict';

let BlogPost = require('../config/schema'),
    mongoose = require('mongoose');

exports.get = function(req, res, next) {
  BlogPost.find({}, function(err, posts) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(posts);
      res.render('index', {posts: posts});
    }
  });
};