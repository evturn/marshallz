import express from 'express'
import path from 'path'
import db from '../models/blogPost'
import bots from '../bots/stream'
import * as blog from './blogPosts'
import devServer, { notifier } from './devServer'
import Server from '../../../dist/js/ser'

const app = express();

if (process.env.NODE_ENV === 'development') {
  devServer(app)
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

app.listen(3000, notifier)