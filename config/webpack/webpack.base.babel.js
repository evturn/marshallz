const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: options.cssLoaders,
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
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
  plugins: options.plugins.concat([
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
  postcss: _ => options.postcssPlugins,
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.react.js',
    ],
    packageMains: [
      'jsnext:main',
      'main',
    ],
    alias: {
      actions:       path.join(__dirname, '..', 'app',    'actions/'),
      containers:    path.join(__dirname, '..', 'app',    'containers/'),
      components:    path.join(__dirname, '..', 'app',    'components/'),
      reducers:      path.join(__dirname, '..', 'app',    'reducers/'),
      store:         path.join(__dirname, '..', 'app',    'store/'),
      routes:        path.join(__dirname, '..', 'app',    'routes'),
      images:        path.join(__dirname, '..', 'assets', 'img/'),
      less:          path.join(__dirname, '..', 'assets', 'less/'),
    },
  },
  devtool: options.devtool,
  target: 'web',
  stats: false,
  progress: true,
})
