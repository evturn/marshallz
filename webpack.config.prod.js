const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src',  'app'),
  output: path.join(__dirname, 'public', 'assets'),
  publicPath: '/assets/'
};
const EXTENSIONS = ['', '.js', '.jsx', '.scss'];
const MODULES_DIRS = ['app', 'node_modules'];
const LOADERS = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
    include: PATHS.app
  },{
    test: /\.json$/,
    loader: 'json-loader'
  },{
    test: /\.png$/,
    loader: 'url-loader'
  },{
    test: /\.jpg$/,
    loader: 'file-loader'
  },{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!sass?includePaths[]='
      + encodeURIComponent(path.resolve(__dirname, 'src', 'app', 'assets', 'scss')))
  },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
  { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000' }
];

module.exports = [
  {
    name: 'browser',
    devtool: 'source-map',
    context: PATHS.app,
    entry: {
      app: './client'
    },
    output: {
      path: PATHS.output,           // The output directory as absolute path
      filename: '[name].js',        // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: PATHS.publicPath  // The output path from the view of the Javascript

    },
    module: {
      loaders: LOADERS
    },
    resolve: {
      extensions: EXTENSIONS,
      modulesDirectories: MODULES_DIRS
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin('css/app.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
    ]
  }, {
    name: 'server-side rendering',
    context: PATHS.app,
    entry: {
      app: './server'
    },
    target: 'node',
    output: {
      path: PATHS.output,           // The output directory as absolute path
      filename: '[name].server.js', // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: PATHS.publicPath, // The output path from the view of the Javascript
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: LOADERS
    },
    resolve: {
      extensions: EXTENSIONS,
      modulesDirectories: MODULES_DIRS
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin('css/app.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false },
        minimize: true
      })
    ]
  }
];
