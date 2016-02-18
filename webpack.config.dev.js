const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const PORT = 3000;
const PATHS = {
  app: path.join(__dirname, 'src', 'app'),
  output: path.join(__dirname, 'public', 'assets'),
  publicPath: '/assets/'
};
const EXTENSIONS = ['', '.js', '.jsx', '.scss'];
const MODULES_DIRS = ['app', 'node_modules'];

module.exports = {
    debug: true,
    cache: true,
    devtool: 'eval-source-map',
    name: 'browser',
    context: PATHS.app,
    entry: {
      app: ['./client', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true']
    },
    output: {
      path: PATHS.output,    // The output directory as absolute path
      filename: '[name].js', // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: '/assets/' // The output path from the view of the Javascript
    },
    devServer: {
      outputPath: PATHS.output,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      port: PORT,
      host: 'localhost'
    },
    module: {
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: PATHS.app
        },
        { test: /\.json$/, loader: 'json-loader'},
        { test: /\.png$/, loader: 'url-loader' },
        { test: /\.jpg$/, loader: 'file-loader' },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
        { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000' },
        { test: /\.scss$/,
          loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' +
            '&sourceMap!sass?sourceMap&outputStyle=expanded' +
            '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, 'src', 'app', 'assets', 'scss'))
        }
      ]
    },
    resolve: {
      extensions: EXTENSIONS,
      modulesDirectories: MODULES_DIRS
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new WriteFilePlugin(),
      new ExtractTextPlugin('css/app.css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      }),
    ]
};
