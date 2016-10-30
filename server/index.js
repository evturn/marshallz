import 'babel-polyfill'
import express from 'express'
// import bodyParser from 'body-parser'
// import configStatic from './middleware/config-static'
// import authorData from './middleware/author-data'
// import postsByAuthor from './middleware/by-author'
// import postsByDate from './middleware/by-date'
// import postBySlug from './middleware/by-slug'
import generator from './generator'

const app = express()

generator()

// app.use(bodyParser.urlencoded({ extended: true }))
// const sendFile = configStatic(app)

// app.get('/api?',
//   authorData,
//   postsByDate
// )

// app.get('/api/authors/:author?',
//   authorData,
//   postsByAuthor
// )

// app.get('/api/post/:slug',
//   authorData,
//   postBySlug
// )

// app.get('*', sendFile)

app.listen(3000, _ => console.log('Listening 🌐'))