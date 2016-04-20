import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1/marshallz')
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', _ => console.log('DB connected'))

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