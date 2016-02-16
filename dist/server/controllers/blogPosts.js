'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _blogPost = require('../models/blogPost');

var _blogPost2 = _interopRequireDefault(_blogPost);

var _bots = require('../bots');

var _bots2 = _interopRequireDefault(_bots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.all = function (req, res, next) {
  _blogPost2.default.find({}).limit(20).sort({ 'timestamp': 'desc' }).exec(function (err, posts) {
    if (err) {
      return err;
    }
    res.locals.posts = posts;
    next();
  });
};

function populateBotWithPosts(author) {
  return new Promise(function (resolve, reject) {
    var authorObject = author.props();

    _blogPost2.default.find({ 'author.username': authorObject.username }).limit(20).sort({ 'timestamp': 'desc' }).exec(function (err, posts) {
      if (err) {
        return err;
      }
      authorObject.posts = posts;

      resolve(authorObject);
    });
  });
}

exports.populateEachBotWithPosts = function (req, res, next) {
  var populated = _bots2.default.map(function (bot) {
    return populateBotWithPosts(bot);
  });

  Promise.all(populated).then(function (v) {
    res.locals.authors = v;
    next();
  });
};

exports.send = function (req, res, next) {
  res.json(res.locals);
};

exports.one = function (req, res, next) {
  var dbQuery = _blogPost2.default.findOne({
    'slug': req.params.slug
  });

  dbQuery.exec(function (err, result) {
    res.json(result);
  });
};