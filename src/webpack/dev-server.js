import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './dev'

export default app => {
  const compiler = webpack(webpackConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
  const hotMiddleware = webpackHotMiddleware(compiler)

  app.use(devMiddleware)
  app.use(hotMiddleware)

  return app
}