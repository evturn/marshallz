const path = require('path');
const webpack = require('webpack');
const assetsPath = path.join(__dirname, '..', 'public', 'assets');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const PORT = 3000;

module.exports = {
    debug: true,
    cache: true,
    devtool: 'eval-source-map',
    name: 'browser',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: ['./client', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true']
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: '/assets/'
    },
    devServer: {
      outputPath: path.join(__dirname, '..', 'public', 'assets'),
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
          include: path.join(__dirname, '..', 'app')
        },
        { test: /\.png$/, loader: 'url-loader' },
        { test: /\.jpg$/, loader: 'file-loader' },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
        { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000' },
        { test: /\.scss$/,
          loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' +
            '&sourceMap!sass?sourceMap&outputStyle=expanded' +
            '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'assets', 'scss'))
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: ['app', 'node_modules']
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
