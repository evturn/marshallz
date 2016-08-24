const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cssnext = require('postcss-cssnext')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')

module.exports = require('./webpack.base.babel')({
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    path.join(process.cwd(), 'app/app.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  cssLoaders: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',

  postcssPlugins: [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      __SEED__: process.env.SEED,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
  ],

  babelQuery: {
    presets: ['react-hmre'],
  },

  devtool: 'inline-source-map',
})
