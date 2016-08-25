import c from 'chalk'
import mongoose from 'mongoose'
import Author from '../../server/models/Author'
import Post from '../../server/models/Post'

import authors from './authors'
import posts from './posts'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1/marshallz')
mongoose.connection.on('error', console.error.bind(console, c.red('Connection error:')))
mongoose.connection.once('open',  _ => console.log(c.green('DB connected 🖖🏽'), '\n'))

drop()
  .then(seed)
  .then(onSuccess)
  .catch(onError)

function drop() {
  return Promise.all([ Author, Post ].map(dropCollection))
}

function seed() {
  const authorModels = authors.map(createAuthor)
  const postModels = posts.map(createPost)
  return Promise.all(authorModels.concat(postModels))
}

function dropCollection(collection) {
  return collection
    .find()
    .remove()
}

function createAuthor(obj) {
  const author = new Author(obj)
  return author.save()
}

function createPost(obj) {
  const post = new Post(obj)
  return post.save()
}

function onError(e) {
  console.log(c.bgRed(e))
  process.exit(1)
}

function onSuccess() {
  const _ = '                                                                    '
  const __ = `                      `
  const msg = [
    `${c.red.bgRed(_)}`,
    `${c.yellow.bgYellow(_)}`,
    `${c.green.bgGreen(_)}`,
    `${c.cyan.bgCyan(_)}`,
    `${c.magenta.bgMagenta(_)}`,
    `${c.blue.bgBlue(_)}`,
    `${__}${c.red('Dropping Database')}`,
    `${c.red.bgRed(_)}`,
    `${c.yellow.bgYellow(_)}`,
    `${c.green.bgGreen(_)}`,
    `${c.cyan.bgCyan(_)}`,
    `${c.magenta.bgMagenta(_)}`,
    `${c.blue.bgBlue(_)}`,
  ].join('\n')
  console.log(msg)
  process.exit(0)
}