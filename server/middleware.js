import express from 'express'
import fs from 'fs'
import path from 'path'
import compression from 'compression'
import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import DashboardPlugin from 'webpack-dashboard/plugin'
import webpackConfig from '../../config/webpack/webpack.dev.babel.js'
import writeConfigLog from '../../config/scripts/log'

export default app => {
  if (process.env.NODE_ENV === 'development') {
    return devMiddleware(app)
  } else {
    return prodMiddleware(app)
  }
}

function devMiddleware(app) {
  const compiler = webpack(webpackConfig)
  compiler.apply(new DashboardPlugin())

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    silent: true,
    publicPath: '/',
    stats: 'errors-only',
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.join(process.cwd(), '/')))
  writeConfigLog(compiler)

  const file = fs.readFileSync(path.join(process.cwd(), 'build', 'index.html'))
  app.get('*', (req, res) => res.send(file.toString()))
}

function prodMiddleware(app) {
  const publicPath = '/'
  const outputPath = path.resolve(process.cwd(), 'build')

  app.use(compression())
  app.use(publicPath, express.static(outputPath))

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')))
}
