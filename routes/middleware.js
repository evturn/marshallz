'use strict';

let BlogPost = require('../config/schema');

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
  let uuid = req.params.uuid,
      slug = req.params.slug;
  
    BlogPost.findOne({
      'uuid': uuid
    },
    function(err, post) {
      if (err) {
        return done(null, false, err);
      }
      else {
        res.render('detail', {post: post});
      }
    });
};

