import mongoose from 'mongoose'
import BlogPost from '../models/blogPost'
import bots from '../bots'

export const init = (req, res, next) => {
  res.locals.blog = {
    section: 'blog',
    filter: {
      all: [],
      author: {}
    },
    pagination: {
      perPage: 20,
      pages: 0,
      total: 0
    },
    authors: [],
    posts: [],
    post: {}
  }

  next()
}

export const findAllPosts = (req, res, next) => {
  BlogPost
    .find({})
    .limit(100)
    .sort({ 'timestamp': 'desc' })
    .exec((err, results) => {
      if (err) { return (err) }
      const pages = Math.ceil(results.length / 2)

      res.locals.blog.posts = results
      res.locals.blog.filter = {
        all: results
      }
      res.locals.blog.showing = results
      res.locals.blog.pagination = {
        perPage: 20,
        total: results.length,
        pages,
        buttons: results.map((item, i) => i + 1).filter(i => i <= pages)
      }

      next()
    })
}

export const populateAuthors = (req, res, next) => {
  res.locals.blog.authors = bots.reduce((acc, bot) => {
    const props = bot.authorData()

    acc[props.username] = props
    return acc
  }, {})

  next()
}

export const filterPostsByUsername = (req, res, next) => {
  const allPosts = res.locals.blog.filter.all
  let allUsers = res.locals.blog.authors
  let filteredByUsername = {}

  allPosts.map(post => {
    filteredByUsername[post.author.username] = filteredByUsername[post.author.username] || []
    filteredByUsername[post.author.username].push(post)
  })

  const usersWithPosts = allUsers.filter(user => {
    let hasPosts = false

    for (let usernameKey in filteredByUsername) {
      if (user.username === usernameKey) {
        hasPosts = true
      }
    }

    return hasPosts
  })

  res.locals.blog.filter.author = filteredByUsername
  res.locals.blog.authors = usersWithPosts
  next()
}

export const findOnePost = (req, res, next) => {
  res.locals.section = 'blog'

  console.log(req.params)

  const q = BlogPost.findOne({
    slug: req.params.post
  })

  q.exec(function(err, result) {
    res.locals.blog = { post: result }

    res.json(res.locals)
  })
}

export const sendPayload = (req, res, next) => {
  res.json(res.locals)
}