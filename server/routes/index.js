import express from 'express'
import path from 'path'
import db from '../models/blogPost'
import streams from '../streams'
import * as blog from './middleware'
import devServer from '../../webpack/dev-server'
import { server as log } from '../../webpack/dev-logger'
import Server from '../../../dist/js/ser'

const app = express();

if (__DEV__) {
  devServer(app)
}

app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '..', '..', '..')))

app.get('/api/locals',     blog.findAll)
app.get('/api/post/:post', blog.findOne)

app.get('*', (req, res) => Server(req, res))

app.listen(process.env.PORT_MARSHALLZ, log)