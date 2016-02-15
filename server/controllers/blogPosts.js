const mongoose = require('mongoose');
const BlogPost = require('../models/blogPost');
const bots = require('../bots');

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

function populateBotWithPosts(bot) {
  return new Promise((resolve, reject) => {
    const botObj = bot.props();

    BlogPost
      .find({'bot.username': botObj.username })
      .limit(20)
      .sort({ 'timestamp': 'desc' })
      .exec((err, posts) => {
        if (err) { return (err); }
        botObj.posts = posts;

        resolve(botObj);
      });
  });
}

exports.populateEachBotWithPosts = function(req, res, next) {
  const populated = bots.map(bot => populateBotWithPosts(bot));

  Promise.all(populated).then(v => {
    res.locals.bots = v;
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
    res.json(result);
  });
};

// exports.bot = function(req, res, next) {
//     BlogPost
//     .find({'bot': { 'username': req.params.username }})
//     .limit(20)
//     .sort({ 'timestamp': 'desc' })
//     .exec((err, posts) => {
//       if (err) { return (err); }
//       const data = {

//         posts: posts,
//         bots: [
//           marshall.public(),
//           clang.public()
//         ]
//       };
//       res.json(data);
//     });
// };