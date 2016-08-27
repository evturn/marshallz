import express from 'express'
import path from 'path'
import compression from 'compression'
import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../config/webpack/webpack.dev.babel.js'
import DashboardPlugin from 'webpack-dashboard/plugin'

const compiler = webpack(webpackConfig)
const buildDir = webpackConfig.output.path
const webpackDev = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  silent: true ,
})
const webpackHot = webpackHotMiddleware(compiler)
const fs = webpackDev.fileSystem
const __DEV__ = process.env.NODE_ENV === 'development'

export default __DEV__ ? devMiddleware : prodMiddleware
export { sendPage }

function devMiddleware() {
  compiler.apply(new DashboardPlugin())
  return [
    webpackDev,
    webpackHot,
  ]
}

function prodMiddleware() {
  return [
    compression(),
    express.static(buildDir),
  ]
}

function sendPage(req, res, next) {
  if (__DEV__) {
    const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'))
    res.send(file.toString())
  } else {
    res.sendFile(path.join(buildDir, 'index.html'))
  }
}
