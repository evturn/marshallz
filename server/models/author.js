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

authorSchema.plugin(deepPopulate);
module.exports = mongoose.model('Author', authorSchema);