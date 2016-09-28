import { Post } from '../models'

export default function bySlug(req, res, next) {
  Post
    .findOne({ slug: req.params.slug })
    .populate({
      path: 'author',
      model: 'Author',
      options: {
        select: '-twitter.keys -twitter.cronjob -blog.cronjob -content',
      }
    })
    .then(post => res.json({
      posts: [ post ],
      author: post.author,
      authors: req.marshallz.authors,
    }))
}
