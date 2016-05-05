import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import {
  PATHS, prodLoaders, extensions,
  alias, modulesDirectories, PORT } from './base'

export default webpack([
  {
    name: 'browser',
    devtool: 'source-map',
    target: 'web',
    context: PATHS.root,
    entry: {
      app: '../app/client'
    },
    output: {
      path: PATHS.output,
      filename: PATHS.static.js,
      publicPath: PATHS.publicPath
    },
    module: { loaders: prodLoaders },
    resolve: { extensions, modulesDirectories, alias },
    postcss: _ => [precss, autoprefixer],
    plugins: [
      new CleanWebpackPlugin(['dist', 'lib'], {
        root: path.join(__dirname, '..', '..')
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, '..', 'assets', 'img', 'favicon.png'),
          to: 'favicon.png'
        }
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: true,
        __SERVER__: false,
        __PORT__: PORT
      })
    ]
  }, {
    name: 'server-side-rendering',
    target: 'node',
    context: PATHS.root,
    entry: {
      ser: '../app/server'
    },
    output: {
      path: PATHS.output,
      filename: PATHS.static.js,
      publicPath: PATHS.publicPath,
      libraryTarget: 'commonjs2'
    },
    module: { loaders: prodLoaders },
    resolve: { extensions, modulesDirectories, alias },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
      }),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: false,
        __SERVER__: true,
        __PORT__: PORT
      })
    ]
  }
], (err, stats) => {
  if (err) {
    const jsonStats = stats.toJson()

    if (jsonStats.errors.length > 0) {
      console.log(json.errors)
    }
  }

  console.log(stats.toString({ colors: true }))
})
