import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import {
  PATHS, loaders, alias,
  extensions, modulesDirectories } from './base';

export default webpack([
  {
    name: 'browser',
    devtool: 'source-map',
    context: PATHS.root,
    entry: {
      app: '../app/client'
    },
    output: {
      path: PATHS.output,
      filename: PATHS.static.js,
      publicPath: PATHS.publicPath
    },
    module: {
      loaders: loaders.concat([
        {
          test: /\.(eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader'
        },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
          include: /global/
        },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?module&localIdentName=[local]__[hash:base64:5]' +
            '!less?includePaths[]=' + encodeURIComponent(PATHS.less)),
          exclude: /global/
        }
      ])
    },
    resolve: { extensions, modulesDirectories, alias },
    plugins: [
      new CleanWebpackPlugin(['dist', 'lib'], {
        root: path.join(__dirname, '..', '..')
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: true,
        __SERVER__: false
      })
    ]
  }, {
    name: 'server-side rendering',
    devtool: 'source-map',
    target: 'node',
    context: PATHS.root,
    entry: {
      ser: '../app/server'
    },
    output: {
      path: PATHS.output,
      filename: PATHS.static.js,
      publicPath: PATHS.publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: loaders.concat([
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
          include: /global/
        },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?module&localIdentName=[local]__[hash:base64:5]' +
            '!less?includePaths[]=' + encodeURIComponent(PATHS.less)),
          exclude: /global/
        }
      ])
    },
    resolve: { extensions, modulesDirectories, alias },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: false,
        __SERVER__: true
      })
    ]
  }
], (err, stats) => {
  if (err) {
    const jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0) {
      console.log(json.errors);
    }
  }

  console.log(stats.toString({ colors: true }))
});
