import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import middleware from './middleware'
import generator from './generator'

generator()

const app = express()

middleware(app)
app.listen(3000, _ => console.log('Listening 🌐'))