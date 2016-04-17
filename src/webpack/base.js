import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const PATHS = {
  app: path.join(__dirname, '..'),
  output: path.join(__dirname, '..', '..', 'dist'),
  publicPath: '/dist/',
  less: path.resolve(__dirname, '..', 'assets', 'less'),
  static: {
    js: 'js/[name].js',
    css: 'css/app.css',
    img: 'img/[hash].[ext]'
  },
  root: __dirname
};

export const alias = {
  actions:       path.join(__dirname, '..', 'app',    'actions/'),
  containers:    path.join(__dirname, '..', 'app',    'containers/'),
  components:    path.join(__dirname, '..', 'app',    'components/'),
  reducers:      path.join(__dirname, '..', 'app',    'reducers/'),
  store:         path.join(__dirname, '..', 'app',    'store/'),
  routes:        path.join(__dirname, '..', 'app',    'routes'),
  images:        path.join(__dirname, '..', 'assets', 'img/'),
  less:          path.join(__dirname, '..', 'assets', 'less/'),
};

export const loaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
    include: PATHS.src
  },{
    test: /\.css$/,
    loaders: ['style', 'css']
  },{
    test: /\.json$/,
    loader: 'json-loader'
  },{
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },{
    test: /\.woff2(\?\S*)?$/,
    loader: 'url-loader?limit=100000'
  },{
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
    include: /global/
  }
];

export const extensions = ['', '.js', '.jsx', '.less'];
export const modulesDirectories = ['app', 'node_modules'];