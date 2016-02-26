import mongoose from 'mongoose';
import BlogPost from '../models/blogPost';
import bots from '../bots';

export const all = (req, res, next) => {
  BlogPost
    .find({})
    .limit(100)
    .sort({ 'timestamp': 'desc' })
    .exec((err, posts) => {
      if (err) { return (err); }
      res.locals.posts = posts;
      next();
    });
};

export const populateAuthors = (req, res, next) => {
  const populated = bots.map(author => {
    return new Promise((resolve, reject) => {
      const authorObject = author.props();

      BlogPost
        .find({'author.username': authorObject.username })
        .limit(100)
        .sort({ 'timestamp': 'desc' })
        .exec((err, posts) => {
          if (err) {
            return (err);
          }

          authorObject.posts = posts;
          resolve(authorObject);
        });
    });
  });

  Promise.all(populated).then(data => {
    res.locals.authors = data;
    next();
  });
};

export const detail = (req, res, next) => {
  const dbQuery = BlogPost.findOne({
    'slug': req.params.slug
  });

  dbQuery.exec((err, result) => {
    res.json(result);
  });
};

export const send = (req, res, next) => {
  res.json(res.locals);
};