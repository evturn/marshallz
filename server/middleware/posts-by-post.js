import { Post } from '../models'

export default function byPost(req, res, next) {
  const limit = 5
  const skip = req.params.page ? ((limit * req.params.page) - limit) : 0

  Post
    .find()
    .sort('-createdAt')
    .limit(limit)
    .skip(skip)
    .populate({
      path: 'author',
      model: 'Author',
      options: {
        select: '-twitter.keys -twitter.cronjob -blog.cronjob -content',
      }
    })
    .then(posts => {
      return res.json(posts)
    })
}
