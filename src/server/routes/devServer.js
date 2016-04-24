import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack/dev.js'
import path from 'path'
import nn from 'node-notifier'

export default function devServer(app) {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))

  return app;
}

export const notifier = _ => {
  if (process.env.NODE_ENV === 'development') {
    nn.notify({
      title: `Marshallz Blog`,
      message: `Server is listening`,
      icon: path.join(__dirname, '../../assets/img/favicon.png'),
      sound: 'Submarine',
      wait: false
    }, (err, res) => {
      console.log(`\x1b[44m%s\x1b[0m`,`🌐`, ` Running ${process.env.NODE_ENV}`)
      console.log(`\x1b[44m%s\x1b[0m`, `💻`, ` PORT: 3000`)
    })
  } else {
    console.log(`\x1b[44m%s\x1b[0m`,`🌐`, ` Running ${process.env.NODE_ENV}`)
    console.log(`\x1b[44m%s\x1b[0m`, `💻`, ` PORT: 3000`)
  }
}