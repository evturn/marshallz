const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Server = require('../public/assets/app.server');
const blogPosts = require('./controllers/blogPosts');
const marshall = require('./bots/marshall');
const clang = require('./bots/clang');

const app = express();

mongoose.connect('mongodb://localhost/marshallz');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('DB connected'));

app.set('port', (process.env.PORT || 3000));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));

const ENV = process.env.NODE_ENV;
const PORT = app.get('port');

if (ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack/webpack.config.dev.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/blogPost', blogPosts.all);

app.get('*', (req, res, next) => Server(req, res));

app.listen(PORT, () => console.log(`Running on ${PORT} in ${ENV.toUpperCase()}`));