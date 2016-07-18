import mongoose from 'mongoose'
import BlogPost from '../models/blogPost'
import bots from '../bots'

const findAll = (req, res, next) => {
  BlogPost
    .find({})
    .limit(100)
    .sort({ 'timestamp': 'desc' })
    .exec((err, items) => {
      if (err) {
        return err
      }

      res.locals.authors = bots.map(x => x._public)
      res.locals.items = items
      res.locals.byAuthor = items.reduce((acc, x) => {
        if (!acc[x.author.username]) {
          acc[x.author.username] = []
        }
        acc[x.author.username].push(x)
        return acc
      }, {})

      res.json(res.locals)
    })
}

const findOne = (req, res, next) => {
  const q = BlogPost.findOne({
    slug: req.params.post
  })

  q.exec((err, result) => {
    res.locals.post = result

    res.json(res.locals)
  })
}

export {
  findOne,
  findAll,
}
