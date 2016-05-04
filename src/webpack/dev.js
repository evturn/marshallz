import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import {
  PATHS, loaders, alias, plugin,
  extensions, modulesDirectories } from './base';

export default {
  debug: true,
  cache: true,
  devtool: 'eval-source-map',
  name: 'browser',
  context: PATHS.root,
  contentBase: PATHS.root,
  entry: {
    app: [
      '../app/client',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },
  output: {
    path: PATHS.output,
    filename: PATHS.static.js,
    publicPath: PATHS.publicPath
  },
  devServer: {
    outputPath: PATHS.output,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    port: process.env.PORT_MARSHALLZ || 3000,
    host: 'localhost'
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
        loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' +
          '&sourceMap!less?sourceMap&outputStyle=expanded' +
          '&includePaths[]=' + encodeURIComponent(PATHS.less),
        exclude: /global/
      }
    ])
  },
  resolve: { extensions, modulesDirectories, alias },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WriteFilePlugin(),
    new ExtractTextPlugin(PATHS.static.css),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
       __DEV__: true,
      __CLIENT__: true,
      __SERVER__: false,
      __PORT__: process.env.PORT_MARSHALLZ
    })
  ]
};
