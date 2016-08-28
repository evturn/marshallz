import { Author, Post } from '../models'

export default function byAuthor(req, res, next) {
  const limit = 5
  const skip = req.query.page ? ((limit * req.query.page) - limit) : 0

  Author
    .findOne({ 'username': req.params.author })
    .select('-twitter.keys -twitter.cronjob -blog.cronjob -content -posts')
    .exec()
    .then(author => {
      return Post
        .find({ author: author._id })
        .sort('-createdAt')
        .limit(limit)
        .skip(skip)
        .populate({
          path: 'author',
          model: 'Author',
          options: {
            select: '-twitter.keys -twitter.cronjob -blog.cronjob -content -posts',
          }
        })
        .then(posts => {
          return res.json({
            posts,
            author,
            authors: req.marshallz.authors,
          })
        })
    })
}
