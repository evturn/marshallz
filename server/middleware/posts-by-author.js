import { Author } from '../models'

export default function byAuthor(req, res, next) {
  const page = req.query.page || 0
  const limit = 5
  const skip = limit * page

  Author
    .findOne({ 'blog.username': req.params.author })
    .select('name blog.username blog.avatar_img blog.profile_img twitter.url posts')
    .populate({
      path: 'posts',
      model: 'Post',
      options: {
        skip,
        limit,
      }
    })
    .then(author => {
      res.json(author)
    })
}
