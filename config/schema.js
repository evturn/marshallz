'use strict';

let mongoose = require('mongoose');

let blogPostSchema = function() {
  return new mongoose.Schema({
    title     : {type : String},
    body      : {type : String},
    slug      : {type : String},
    timestamp : {type : Date, default: Date.now()},
    uuid      : {type : String, default: Date.now()},
    image     : {type : String},
    author    : {type : String}
  });
};

module.exports = mongoose.model('BlogPost', blogPostSchema());