'use strict';
function populate() {
  const mongoose = require ('mongoose');
  const models = require('./models');

  mongoose.connect('mongodb://localhost/marshallz');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', () => console.log('DB connected'));

  const BlogPost = models.BlogPost;
  const Author = models.Author;
  return new Promise((resolve, reject) => {

    const posts = BlogPost.find({}).limit(10).sort({ 'timestamp': 'desc' }).deepPopulate(['author']).exec((err, posts) => {
      if (err) { return (err); }

      return { posts: posts };
    });
    resolve(posts);
  });
}

const posts = populate();

posts.then((v) => {
  return v.map((item) => {
    return {
      title: item.title,
      image: item.image,
      name: item.author.name,
      username: item.author.username,
      _id: item._id,
      body: item.body,
      timestamp: item.timestamp,
      slug: item.slug
    };
  });
}).then((v) => {
  console.log(v);
});





