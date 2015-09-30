'use strict';

let tweet = require('../config/tweets'),
    Firebase = require('firebase'),
    ref = new Firebase('https://marshallz.firebaseio.com/posts');

exports.get = function(req, res, next) {
  res.render('index');
};

exports.twitter = function(req, res) {
  let post = newPost();

  res.status(200).json(post);
};

exports.posts = function(req, res, next) {
  let models = [];
  ref.limitToLast(50).on('child_added', function(data) {
    return new Promise(function(resolve, reject) {
      resolve(data.val());
    }).then(function(v) {
        console.log(v);
        models.push(v);
        console.log(models.length);
        if (models.length === 50) {
          res.json(models);
        }
      });
  });
};