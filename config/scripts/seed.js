import c from 'chalk'
import mongoose from 'mongoose'
import Author from '../../server/models/Author'
import Post from '../../server/models/Post'

import authors from '../../assets/authors'
import posts from '../../assets/posts'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1/marshallz')
mongoose.connection.on('error', console.error.bind(console, c.red('Connection error:')))
mongoose.connection.once('open',  _ => console.log(c.green('DB connected 🖖🏽'), '\n'))

const collections = [ Author, Post ]

collections.map(x => {
  x.find()
    .remove()
    .then(_ =>
      Promise.all(
        authors.data
          .map(x => new Author(x))
          .concat(posts.data.map(x => new Post(x)))
          .map(x => x.save())
      )
    )
    .then(onSuccess)
    .catch(onError)
})

function getEnvVars(obj) {
  if (obj.twitter) {
    const { keys } = obj.twitter
    obj.twitter.keys = {
      consumer_key: process.env[keys.consumer_key],
      consumer_secret: process.env[keys.consumer_secret],
      access_token_key: process.env[keys.access_token_key],
      access_token_secret: process.env[keys.access_token_secret],
    }
  }
  return obj
}

function onSuccess(files) {
  const n = `\n`
  const __ = `               `
  const _ = __
  const say = args => c.green(n + __ + args)
  const msg = [
    `${say('  Dropping DB')}`,
    `${c.red.bgRed(_)}`,
    `${c.yellow.bgYellow(_)}`,
    `${c.green.bgGreen(_)}`,
    `${c.cyan.bgCyan(_)}`,
    `${c.magenta.bgMagenta(_)}`,
    `${c.blue.bgBlue(_)}`,
    `${c.magenta.bgMagenta(_)}`,
    `${c.cyan.bgCyan(_)}`,
    `${c.green.bgGreen(_)}`,
    `${c.yellow.bgYellow(_)}`,
    `${say(files.length + ' models added' + n)}`,
  ]
  .map(x => __ + x)
  .join(n + n)
  console.log(msg)
  process.exit(0)
}

function onError(e) {
  console.log(c.bgRed(e))
  process.exit(1)
}