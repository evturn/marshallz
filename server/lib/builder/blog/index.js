'use strict';
const giphy = require('./giphy');
const Post = require('./post');
const BlogPost = require('../../../models/blog-post');

module.exports = (author) => {
  const media = giphy(author);
  const copy = new Post(author);
  Promise.all([media, copy])
    .then((values) => {
      const image = values[0].image;
      const post = values[1];
      const blogPost = new BlogPost({
        title     : post.title,
        body      : post.sentences,
        slug      : post.slug,
        timestamp : post.timestamp,
        image     : image,
        author    : author._id
      });

      blogPost.save((err, blogPost) => {
        if (err) { return err; }
        author.posts.push(blogPost._id);
        author.save();
        return blogPost;
      });
    })
    .catch((err) => {
      throw new Error(`Couldn't grab your shit.`, err);
    });
};