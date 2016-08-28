import express from 'express'
import bodyParser from 'body-parser'
import configStatic, { sendPage } from './middleware/config-static'
import authorData from './middleware/author-data'
import byAuthor from './middleware/posts-by-author'
import byPost from './middleware/posts-by-post'
import generator from './generator'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(configStatic())

app.get('/api/:page?',
  authorData,
  byPost
)
app.get('/api/authors/:author?',
  authorData,
  byAuthor
)

app.get('*',
  sendPage
)

const action = {
  type: 'blog',
  _id: '57bd35cf84cf8c87e3a01f61',
}

generator(action)

app.listen(3000, _ => console.log('Listening 🌐'))
