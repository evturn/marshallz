import express from 'express'
import bodyParser from 'body-parser'
import byAuthor from './middleware/posts-by-author'
import byDate from './middleware/posts-by-date'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/:page?',           byDate)
app.get('/authors/:author?', byAuthor)

app.listen(3000, _ => console.log('Listening 🌐'))
