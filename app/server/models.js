'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const authorSchema = new Schema({
  name      : {type : String},
  username  : {type : String},
  avatar    : {type : String},
  policy    : {type : Number},
  filepath  : {type : String},
  social: {
    twitter : {type : String}
  },
  keywords  : [{type : String}],
  posts     : [{type: Schema.Types.ObjectId, ref: 'BlogPost'}]
});

const blogPostSchema = new Schema({
  title     : {type : String},
  body      : {type : String},
  slug      : {type : String},
  timestamp : {type : Date, default: Date.now()},
  uuid      : {type : String, default: Date.now()},
  image     : {type : String},
  author    : {type: Schema.Types.ObjectId, ref: 'Author'}
});

authorSchema.plugin(deepPopulate);
blogPostSchema.plugin(deepPopulate);

module.exports.Author = mongoose.model('Author', authorSchema);
module.exports.BlogPost = mongoose.model('BlogPost', blogPostSchema);