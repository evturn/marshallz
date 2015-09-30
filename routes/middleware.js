'use strict';

let tweet = require('../config/tweets');

exports.get = function(req, res) {
  res.render('index');
};

exports.twitter = function(req, res) {
  let post = newPost();

  res.status(200).json(post);
};