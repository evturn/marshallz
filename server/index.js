'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const webpack = require('webpack');
const App = require('../public/assets/app.server');
const blogPosts = require('./controllers/blogPosts');
const bots = require('./controllers/bots');
const marshall = require('./bots/marshall');
const clang = require('./bots/clang');

const app = express();
const config = require('../webpack/webpack.config.dev.js');
const compiler = webpack(config);

mongoose.connect('mongodb://localhost/marshallz');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('DB connected'));

fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.set('port', (process.env.PORT || 3000));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));

const node_env = process.env.NODE_ENV;
console.log('Environment: ' + node_env);

app.get('/blogPost', blogPosts.all);

app.get('*', function (req, res, next) {
  App(req, res);
});

app.listen(app.get('port'));
