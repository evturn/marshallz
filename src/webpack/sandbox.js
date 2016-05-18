import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { extensions, modulesDirectories, alias } from './base'

const outputPath = path.join(__dirname, '..', 'server', 'sandbox', 'ui', 'dist')

export default {
  entry: {
    ui: [
      '../server/sandbox/ui',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },
  context: __dirname,
  devtool: 'sourcemaps',
  output: {
    path: outputPath,
    filename: 'ui.js',
    publicPath: '/'
  },
  devServer: {
    outputPath: outputPath,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    port: 3001,
    host: 'localhost'
  },
  resolve: { extensions, modulesDirectories, alias },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/
      },{
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },{
        test: /\.json$/,
        loader: 'json-loader'
      },{
        test: /\.(gif|eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },{
        test: /\.(png|jpe?g|svg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      },{
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'assets', 'img', 'hs-borf.png'),
        to: 'hs-borf.png'
      },{
        from: path.join(__dirname, '..', 'assets', 'img', 'hs-clang.png'),
        to: 'hs-clang.png'
      },{
        from: path.join(__dirname, '..', 'assets', 'img', 'hs-marshall.png'),
        to: 'hs-marshall.png'
      },{
        from: path.join(__dirname, '..', 'assets', 'img', 'av-borf.png'),
        to: 'av-borf.png'
      },{
        from: path.join(__dirname, '..', 'assets', 'img', 'av-clang.png'),
        to: 'av-clang.png'
      },{
        from: path.join(__dirname, '..', 'assets', 'img', 'av-marshall.png'),
        to: 'av-marshall.png'
      },
    ])
  ]
}