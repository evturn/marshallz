import express from 'express'
import bodyParser from 'body-parser'
import configStatic, { sendPage } from './middleware/config-static'
import byAuthor from './middleware/posts-by-author'
import byPost from './middleware/posts-by-post'

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(configStatic())
app.get('/api/:page?',           byPost)
app.get('/api/authors/:author?', byAuthor)

app.get('*',                    sendPage)

app.listen(3000, _ => console.log('Listening 🌐'))
