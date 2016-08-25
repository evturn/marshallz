import express from 'express'
import path from 'path'
import compression from 'compression'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'

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

export default options => {
  const __DEV__ = process.env.NODE_ENV === 'development'

  const app = express()

  if (__DEV__) {
    devMiddleware(app, options)
  } else {
    prodMiddleware(app, options)
  }

  return app
}
