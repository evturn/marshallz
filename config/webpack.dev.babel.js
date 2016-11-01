const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createWebpackConfig = require('./webpack.base.babel.js')
const cwd = process.cwd()

const configureWebpack = require('./webpack.base.babel')

module.exports = createWebpackConfig({
  entry: [
    'webpack-hot-middleware/client',
    path.join(cwd, 'app/index.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  babelQuery: {
    presets: ['react-hmre'],
  },

  cssLoaders: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WriteFilePlugin({ log: false }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),
    new webpack.DefinePlugin({ __DEV__: true })
  ],

  devtool: 'inline-source-map',
})
