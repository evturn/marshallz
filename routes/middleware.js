'use strict';

let BlogPost = require('../config/schema'),
    mongoose = require('mongoose');

exports.index = function(req, res, next) {
  BlogPost
    .find({})
    .limit(10)
    .sort({uuid: 'desc'})
    .exec(function(err, posts) {
    if (err) {
        console.log(err);
    }
    else {
        res.render('index', {posts: posts, page: 2});
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
  let page = req.query.page,
      count = 5,
      start = count * page,
      increment = parseInt(page) + 1;

  BlogPost
    .find({})
    .skip(start)
    .limit(count)
    .sort({uuid: 'desc'})
    .exec(function(err, posts) {
      if (err) {
          console.log(err);
      }
      else {
          res.json({posts: posts, page: increment});
      }
  });
};