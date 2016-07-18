import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const PATHS = {
  app: path.join(__dirname, '..', '..', 'src'),
  output: path.join(__dirname, '..', '..', 'dist'),
  publicPath: '/dist/',
  less: path.resolve(__dirname, '..', 'assets', 'less'),
  static: {
    js: 'js/[name].js',
    css: 'css/app.css',
    img: 'img/[name].[ext]'
  },
  root: __dirname
}

export const alias = {
  actions:       path.join(__dirname, '..', 'app',    'actions/'),
  containers:    path.join(__dirname, '..', 'app',    'containers/'),
  components:    path.join(__dirname, '..', 'app',    'components/'),
  reducers:      path.join(__dirname, '..', 'app',    'reducers/'),
  store:         path.join(__dirname, '..', 'app',    'store/'),
  routes:        path.join(__dirname, '..', 'app',    'routes'),
  images:        path.join(__dirname, '..', 'assets', 'img/'),
  less:          path.join(__dirname, '..', 'assets', 'less/'),
}

export const extensions = ['', '.js', '.jsx', '.less']
export const modulesDirectories = ['node_modules']
export const PORT = process.env.PORT_MARSHALLZ || 3000

export const devLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
    include: PATHS.app
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
]

export const prodLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    exclude: /node_modules/
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
  },{
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
    include: /global/
  },{
    test: /\.less$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader?module&localIdentName=[local]__[hash:base64:5]&importLoaders=1!postcss-loader' +
      '!less?includePaths[]=' + encodeURIComponent(PATHS.less)),
    exclude: /global/
  }
]