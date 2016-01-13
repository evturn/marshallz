'use strict';
const mongoose = require('mongoose');
const _ = require('lodash');
const BlogPost = require('../models/blogPost');

exports.all = function(req, res, next) {
  BlogPost
    .find({})
    .limit(20)
    .sort({ 'timestamp': 'desc' })
    .exec((err, blogPosts) => {
      if (err) { return (err); }
      console.log(blogPosts);
      res.json(blogPosts);
    });
};