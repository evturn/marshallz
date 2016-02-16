'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title:       {type: String},
  body:        {type: String},
  slug:        {type: String},
  image:       {type: String},
  timestamp:   {type: Date, default: Date.now},
  author: {
    name:      {type: String},
    username:  {type: String},
    index:     {type: Number},
    avatar:    {type: String},
    social:    {type: Boolean}
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);