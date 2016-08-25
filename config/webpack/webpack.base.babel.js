const path = require('path')
const webpack = require('webpack')

const cssnext = require('postcss-cssnext')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')

module.exports = opts => ({
  entry: opts.entry,

  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, opts.output),

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: opts.babelQuery,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: opts.cssLoaders,
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: [ 'style-loader', 'css-loader' ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader?limit=10000',
    }],
  },

  plugins: opts.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      fetch: 'exports?self.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),


  resolve: {
    modules:      ['app', 'node_modules'],
    extensions:   ['', '.js', '.jsx', '.react.js'],
    packageMains: ['jsnext:main', 'main'],
  },

  postcss: _ => [
    postcssFocus(),
    cssnext({ browsers: ['last 2 versions', 'IE > 10'] }),
    postcssReporter({ clearMessages: true }),
  ],
  devtool: opts.devtool,
  target: 'web',
  stats: false,
  progress: true,
})
