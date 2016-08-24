import { Post } from '../models'

export default function byDate(req, res, next) {
  const page = req.params.page || 0
  const limit = 5
  const skip = (limit * page) - limit

  Post
    .find()
    .sort('-createdAt')
    .limit(limit)
    .skip(skip)
    .populate({
      path: 'author',
      model: 'Author',
      options: {
        select: 'name blog.username blog.avatar_img blog.profile_img twitter.url posts',
      }
    })
    .then(posts => {
      res.json(posts)
    })
}
