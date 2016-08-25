import express from 'express'
import bodyParser from 'body-parser'
import byAuthor from './middleware/posts-by-author'
import byPost from './middleware/posts-by-post'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('api/:page?',           byPost)
app.get('api/authors/:author?', byAuthor)

app.listen(3000, _ => console.log('Listening 🌐'))
