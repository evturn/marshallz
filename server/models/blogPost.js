'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title     : {type: String},
  body      : {type: String},
  slug      : {type: String},
  timestamp : {type: Date, default: Date.now},
  uuid      : {type: String, default: Date.now},
  image     : {type: String},
  author    : {type: String}
});

module.exports = mongoose.model('BlogPost', blogPostSchema);