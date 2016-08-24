import mongoose, { Schema } from 'mongoose'

const Post = new Schema({
  title:       { type: String },
  body:        { type: String },
  slug:        { type: String },
  image_url:   { type: String },
  author:      { type: Schema.Types.ObjectId, ref: 'Author' },
}, {
  timestamps: true
})

export default mongoose.model('Post', Post)
