import mongoose, { Schema } from 'mongoose'

const Author = new Schema({
  name:                  { type: String },
  content:               { type: String },
  username:              { type: String },
  blog: {
    url:                 { type: String },
    avatar_img:          { type: String },
    profile_img:         { type: String },
    cronjob:             { type: String },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }],
  },
  twitter: {
    url:                 { type: String },
    cronjob:             { type: String },
    keys: {
      consumer_key:      { type: String },
      consumer_secret:   { type: String },
      token_key:         { type: String },
      token_secret:      { type: String },
    }
  },
})

export default mongoose.model('Author', Author)
