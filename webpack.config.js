'use strict';

let webpack = require('webpack'),
    path = require('path');

module.exports = {
  context: __dirname,
  entry: ['./public/build/js/app.js'],
  output: {
      path: __dirname + '/public/dist/js',
      filename: 'bundle.js',
      publicPath: '/public/dist/js/'
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
      'web_modules',
      'node_modules',
      'shared'
    ],
    moduleDirectories: [
      'web_modules',
      'node_modules',
      'shared'
    ],
    extension: [
      '',
      '.js',
      '.json'
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
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  devtool: 'source-map'
};