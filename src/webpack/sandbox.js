import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { extensions, modulesDirectories } from './base'

const outputPath = path.join(__dirname, '..', 'server', 'sandbox', 'ui', 'dist')

export default {
  entry: {
    ui: [
      '../server/sandbox/ui',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },
  context: __dirname,
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
  resolve: { extensions, modulesDirectories },
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
        test: /\.(png|jpe?g|svg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
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
      },
    ])
  ]
}