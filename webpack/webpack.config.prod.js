const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");
const assetsPath = path.join(__dirname, "..", "public", "assets");
const publicPath = "assets/";

var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
    include: path.join(__dirname, "..",  "app")
  },{
    test: /\.json$/,
    loader: "json-loader"
  },{
    test: /\.png$/,
    loader: "url-loader"
  },{
    test: /\.jpg$/,
    loader: "file-loader"
  },{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!sass?includePaths[]='
      + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'assets', 'scss')))
  },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
  { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000' }
];

module.exports = [
  {
    name: "browser",
    devtool: "source-map",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./client"
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: publicPath

    },

    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ["eslint"]
      }],
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      // Order the modules and chunks by occurrence.
      // This saves space, because often referenced modules
      // and chunks get smaller ids.
      new webpack.optimize.OccurenceOrderPlugin(),
      // extract inline css from modules into separate files
      new ExtractTextPlugin("css/app.css"),
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
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].server.js",
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      // Order the modules and chunks by occurrence.
      // This saves space, because often referenced modules
      // and chunks get smaller ids.
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      // extract inline css from modules into separate files
      new ExtractTextPlugin('css/app.css'),
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
  }
];
