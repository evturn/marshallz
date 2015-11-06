'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['./client/build/js/app.js'],
  output: {
      path: 'client/dist/js/',
      filename: 'bundle.js',
      publicPath: '/client/dist/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    root: [
      'node_modules',
      'shared/web_modules',
      'shared'
    ],
    moduleDirectories: [
      'node_modules',
      'shared/web_modules',
      'shared'
    ],
    extension: [
      '.js'
    ],
    alias: {
      jquery: 'jquery',
      underscore: 'underscore',
      backbone: 'backbone'
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  devtool: 'source-map'
};