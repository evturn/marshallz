'use strict';

let BlogPost = require('../config/schema'),
    mongoose = require('mongoose');

exports.index = function(req, res, next) {
  BlogPost.find({}).sort({uuid: 'desc'}).exec(function(err, posts) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(posts);
      res.render('index', {posts: posts});
    }
  });
};

exports.detail = function(req, res, next) {
  BlogPost.findById(req.params.id, function(err, post) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(post);
      res.render('detail', post);
    }
  });
};