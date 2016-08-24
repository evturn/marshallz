import mongoose, { Schema } from 'mongoose'

const Author = new Schema({
  name:                  { type: String },
  content:               { type: String },
  blog: {
    username:            { type: String },
    url:                 { type: String },
    avatar_img:          { type: String },
    profile_img:         { type: String },
    cronjob:             { type: String },
  },
  twitter: {
    cronjob:             { type: String },
    url:                 { type: String },
    consumer_key:        { type: String },
    consumer_secret:     { type: String },
    access_token_key:    { type: String },
    access_token_secret: { type: String },
  },
  posts:                 [ { type: Schema.Types.ObjectId, ref: 'Post' } ],
})

export default mongoose.model('Author', Author)
