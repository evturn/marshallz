import path from 'path'
import express from 'express'
import db from '../models/blogPost'
import obs from '../bots/stream'

import * as blog from './blogPosts'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack/dev.js'
import Server from '../../../dist/js/ser'

const app = express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '..', '..', '..')))

app.get(
  '/api/locals',
  blog.init,
  blog.findAllPosts,
  blog.filterPostsByUsername,
  blog.sendPayload
)
app.get(
  '/api/post/:post',
  blog.findOnePost
)

app.get('*', (req, res) => Server(req, res))

app.listen(3000, _ => {
  console.log(`\x1b[44m%s\x1b[0m`,`🌐`, ` Running ${process.env.NODE_ENV}`)
  console.log(`\x1b[44m%s\x1b[0m`, `💻`, ` PORT: 3000`)
})