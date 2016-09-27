import { Author, Post } from '../models'

export default function byAuthor(req, res, next) {
  const page = parseInt(req.query.page) || 1
  const limit = 5
  const skip = page > 1 ? ((limit * page) - limit) : 0

  Author
    .findOne({ 'username': req.params.author })
    .select('-twitter.keys -twitter.cronjob -blog.cronjob -content -posts')
    .exec()
    .then(author => {
      return Post
        .find({ author: author._id })
        .count()
        .then(count => {
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
                meta: {
                  back: skip > 0 ? page - 1 : false,
                  next: skip + posts.length < count ? page + 1 : false,
                  count,
                },
              })
            })
        })
    })
}
