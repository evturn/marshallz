'use strict';

let tweet = require('./lib/tweets'),
    Firebase = require('firebase'),
    ref = new Firebase('https://marshallz.firebaseio.com/posts');

exports.get = function(req, res, next) {
  let models = [];
  ref.limitToLast(50).on('child_added', function(data) {
    return new Promise(function(resolve, reject) {
      resolve(data.val());
    }).then(function(v) {
        models.push(v);
        if (models.length === 50) {
          models.reverse();
          res.render('index', {posts: models});
        }
      });
  });
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
        models.push(v);
        if (models.length === 50) {
          res.json(models);
        }
      });
  });
};

exports.detail = function(req, res, next) {
  let uuid = req.params.uuid;
  let slug = req.params.slug;
  ref.orderByValue().equalTo(uuid).on('child_added', function(snapshot) {
    console.log(snapshot.val());
  });
};

