'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title:       {type: String},
  body:        {type: String},
  slug:        {type: String},
  image:       {type: String},
  author:      {type: String},
  timestamp:   {type: Date, default: Date.now},
  bot: {
    name:      {type: String},
    username:  {type: String},
    avatar:    {type: String},
    social: {
      twitter: {type: String}
    }
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);