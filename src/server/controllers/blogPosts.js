import mongoose from 'mongoose';
import BlogPost from '../models/blogPost';
import bots from '../bots';

exports.all = function(req, res, next) {
  BlogPost
    .find({})
    .limit(20)
    .sort({ 'timestamp': 'desc' })
    .exec((err, posts) => {
      if (err) { return (err); }
      res.locals.posts = posts;
      next();
    });
};

function populateBotWithPosts(author) {
  return new Promise((resolve, reject) => {
    const authorObject = author.props();

    BlogPost
      .find({'author.username': authorObject.username })
      .limit(20)
      .sort({ 'timestamp': 'desc' })
      .exec((err, posts) => {
        if (err) { return (err); }
        authorObject.posts = posts;

        resolve(authorObject);
      });
  });
}

exports.populateEachBotWithPosts = function(req, res, next) {
  const populated = bots.map(bot => populateBotWithPosts(bot));

  Promise.all(populated).then(v => {
    res.locals.authors = v;
    next();
  });
};

exports.send = function(req, res, next) {
  res.json(res.locals);
};

exports.one = function(req, res, next) {
  const dbQuery = BlogPost.findOne({
    'slug': req.params.slug
  });

  dbQuery.exec((err, result) => {
    res.locals.detail.post = result

    res.json(res.locals);
  });
};