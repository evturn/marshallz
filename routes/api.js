var express = require('express');
var tweet   = require('../config/tweets.js');
var api = express.Router();

api.get('/', function(req, res) {
  var post = newPost();
  res.status(200).json(post);
});

module.exports = api;