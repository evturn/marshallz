const mongoose = require('mongoose')
const BlogPost = require('../models/blogPost')
const bots = require('../bots')

const findAll = (req, res, next) => {
  BlogPost
    .find({})
    .limit(100)
    .sort({ 'timestamp': 'desc' })
    .exec((err, items) => {
      if (err) {
        return err
      }

      const perPage = 10
      const authors = bots.map(x => x._public)

      const pages = items
        .map((x, i) => i + 1)
        .filter(i => i <= Math.ceil(items.length / perPage))

      const byAuthor = items.reduce((acc, x) => {
        if (!acc[x.author.username]) {
          acc[x.author.username] = []
        }
        acc[x.author.username].push(x)
        return acc
      }, {})

      res.locals.authors = authors
      res.locals.filter = { author: byAuthor }
      res.locals.pagination = { perPage, items, pages }

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

module.exports.findOne = findOne
module.exports.findAll = findAll
