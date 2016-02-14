const mongoose = require('mongoose');
const BlogPost = require('../models/blogPost');
const clang = require('../bots/clang');
const marshall = require('../bots/marshall');

exports.all = function(req, res, next) {
  BlogPost
    .find({})
    .limit(20)
    .sort({ 'timestamp': 'desc' })
    .exec((err, posts) => {
      if (err) { return (err); }
      const data = {
        posts: posts,
        bots: [
          marshall.public(),
          clang.public()
        ]
      };
      res.json(data);
    });
};