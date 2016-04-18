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
    include: PATHS.app
  },{
    test: /\.css$/,
    loaders: ['style', 'css']
  },{
    test: /\.json$/,
    loader: 'json-loader'
  },{
    test: /.*\.(png|jpe?g|svg)$/i,
    loaders: [
      `file?hash=sha512&digest=hex&name=${PATHS.static.img}`,
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
    ],
    exclude: /less/
  },{
    test: /\.(gif|eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  },{
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },{
    test: /\.woff2(\?\S*)?$/,
    loader: 'url-loader?limit=100000'
  }
];

export const extensions = ['', '.js', '.jsx', '.less'];
export const modulesDirectories = ['app', 'node_modules'];