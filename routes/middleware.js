'use strict';

let BlogPost = require('../config/schema'),
    mongoose = require('mongoose');

exports.index = function(req, res, next) {
  BlogPost
    .find({})
    .limit(2)
    .sort({uuid: 'desc'})
    .exec(function(err, posts) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(posts.length);
        res.render('index', {posts: posts, page: 1});
    }
  });
};

exports.detail = function(req, res, next) {
  BlogPost.findById(req.params.id, function(err, post) {
    if (err) {
        console.log(err);
    }
    else {
        res.render('detail', post);
    }
  });
};

exports.page = function(req, res, next) {
  console.log(req.params);
  BlogPost
    .find({})
    .skip(2)
    .limit(2)
    .sort({uuid: 'desc'})
    .exec(function(err, posts) {
      if (err) {
          console.log(err);
      }
      else {
          console.log(posts.length);
          res.json({posts: posts});
      }
  });
};