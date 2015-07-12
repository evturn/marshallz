var express = require('express');

var api = express.Router();

api.get('/', function(req, res) {
  var post = newPost();
  res.status(200).json(post);
});

module.exports = api;