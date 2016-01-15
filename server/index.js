'use strict';
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const secrets = require('./config/secrets');
const webpack = require('webpack');
const config = require('../webpack/webpack.config.dev.js');
const app = express();
const marshall = require('./bots/marshall');
const clang = require('./bots/clang');
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

require('./config/passport')(app, passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

app.listen(app.get('port'));
