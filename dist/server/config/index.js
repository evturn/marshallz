'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bots = require('../bots');

var _bots2 = _interopRequireDefault(_bots);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfigDev = require('../../../webpack.config.dev.js');

var _webpackConfigDev2 = _interopRequireDefault(_webpackConfigDev);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENV = process.env.NODE_ENV;
var HOST = process.env.HOST || '127.0.0.1';
var DB = process.env.DB || 'marshallz';
var PORT = 3000;
var STATIC = {
  public: _path2.default.join(__dirname, '..', '..', '..', 'public'),
  img: _path2.default.join(__dirname, '..', '..', '..', 'public', 'img')
};

var app = (0, _express2.default)();

_mongoose2.default.connect('mongodb://' + HOST + '/' + DB);
_mongoose2.default.connection.on('error', console.error.bind(console, 'connection error:'));
_mongoose2.default.connection.once('open', function () {
  return console.log('DB connected');
});

app.set('port', PORT);
app.disable('x-powered-by');
app.use(_express2.default.static(STATIC.public));
app.use('/img', _express2.default.static(STATIC.img));

if (ENV === 'development') {
  var compiler = (0, _webpack2.default)(_webpackConfigDev2.default);

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    noInfo: true,
    publicPath: _webpackConfigDev2.default.output.publicPath
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

(0, _routes2.default)(app);

app.listen(PORT, function () {
  console.log('\u001b[44m%s\u001b[0m', '🌐', ' NODE_ENV: ' + ENV);
  console.log('\u001b[44m%s\u001b[0m', '💻', ' PORT: ' + PORT);
});