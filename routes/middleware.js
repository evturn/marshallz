'use strict';

let tweet = require('../config/tweets'),
    Firebase = require('firebase'),
    ref = new Firebase('https://marshallz.firebaseio.com/posts');

exports.get = function(req, res, next) {
  ref.limitToLast(50).on('value', function(data) {
    let posts = data.val();
    res.render('index', posts);
  });
};

exports.twitter = function(req, res) {
  let post = newPost();

  res.status(200).json(post);
};