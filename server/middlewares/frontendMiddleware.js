const express = require('express')
const path = require('path')
const compression = require('compression')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')

const devMiddleware = (app, options) => {
  const compiler = webpack(options)
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: options.output.publicPath,
    silent: true,
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  const fs = middleware.fileSystem

  app.get('*', (req, res) => {
    const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'))
    res.send(file.toString())
  })
}

const prodMiddleware = (app, options) => {
  app.use(compression())
  app.use(options.output.publicPath, express.static(options.output.path))

  app.get('*', (req, res) => res.sendFile(path.join(options.output.path, 'index.html')))
}

module.exports = options => {
  const __DEV__ = process.env.NODE_ENV === 'development'

  const app = express()

  if (__DEV__) {
    devMiddleware(app, options)
  } else {
    prodMiddleware(app, options)
  }

  return app
}
