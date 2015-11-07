'use strict';
const giphy = require('./giphy');
const Post = require('./post');
const BlogPost = require('../../../models/blog-post');

module.exports = (author) => {
  const media = giphy(author);
  const copy = new Post(author);
  Promise.all([media, copy])
    .then((values) => {
      console.log(values);
      const image = values[0];
      const post = values[1].Post;
      const blogPost = new BlogPost({
        title     : post.title,
        body      : post.body,
        slug      : post.slug,
        image     : image,
        author    : author._id
      });

      blogPost.save((err, blogPost) => {
        if (err) { return err; }
        console.log('========NEW POST=======');
        console.log(blogPost);
        console.log('========NEW POST=======');
        return blogPost;
      });
    })
    .catch((err) => {
      throw new Error(`Couldn't grab your shit.`, err);
    });
};