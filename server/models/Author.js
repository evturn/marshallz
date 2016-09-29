import mongoose, { Schema } from 'mongoose'

const Author = new Schema({
  name: String,
  content: String,
  username: String,
  avatar_img: String,
  profile_img: String,
  cronjobs: [],
  blog:{ url: String },
  twitter: {
    url: String,
    keys: {
      consumer_key: String,
      consumer_secret: String,
      access_token_key: String,
      access_token_secret: String,
    }
  },
})

export default mongoose.model('Author', Author)
