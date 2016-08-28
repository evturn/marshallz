import { Author } from '../models'

export default function byAuthor(req, res, next) {
  const limit = 5
  const skip = req.query.page ? ((limit * req.query.page) - limit) : 0

  Author
    .findOne({ 'username': req.params.author })
    .select('-twitter.keys -twitter.cronjob -blog.cronjob -content')
    .populate({
      path: 'posts',
      model: 'Post',
      options: {
        skip,
        limit,
      }
    })
    .then(posts => {
      console.log(posts)
      return res.json({
        posts,
        authors: req.marshallz.authors,
      })
    })
}
