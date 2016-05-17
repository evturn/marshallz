import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  extensions,
  alias, modulesDirectories, PORT } from './base'

export default webpack({
  entry: {
    ui: '../server/sandbox/ui'
  },
  context: __dirname,
  output: {
    path: path.join(__dirname, '..', 'server', 'sandbox', 'ui', 'dist'),
    filename: 'ui.js',
    publicPath: '/'
  },
  resolve: { extensions, modulesDirectories },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/
      },{
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },{
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}, (err, stats) => {
  if (err) {
    const jsonStats = stats.toJson()

    if (jsonStats.errors.length > 0) {
      console.log(json.errors)
    }
  }

  console.log(stats.toString({ colors: true }))
})