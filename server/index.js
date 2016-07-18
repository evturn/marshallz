const express = require('express')
const logger = require('./logger')
const db = require('./models/blogPost')
const blog = require('./middlewares/backendMiddleware')
const frontend = require('./middlewares/frontendMiddleware')

const __DEV__ = process.env.NODE_ENV !== 'production'
const app = express()

const webpackConfig = __DEV__
  ? require('../webpack/webpack.dev.babel')
  : require('../webpack/webpack.prod.babel')

app.get('/api/locals',     blog.findAll)
app.get('/api/post/:post', blog.findOne)

app.use(frontend(webpackConfig))

const port = process.env.PORT || 3000

app.listen(port, e => {
  if (e) {
    return logger.error(e)
  }

  logger.appStarted(port)
})
