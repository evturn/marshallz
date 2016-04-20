import mongoose from 'mongoose'

const blogPost = new mongoose.Schema({
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
    social:    {type: Boolean},
    share: {
      twitter: {type: String}
    }
  }
})

export default mongoose.model('BlogPost', blogPost);