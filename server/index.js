const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const App = require('../public/assets/app.server');
const webpack = require('webpack');
const blogPosts = require('./controllers/blogPosts');
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

app.set('port', (process.env.PORT || 3000));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));

const ENV = process.env.NODE_ENV;
const PORT = app.get('port');

if (ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/blogPost', blogPosts.all);

app.get('*', (req, res, next) => App(req, res));

app.listen(PORT, () => console.log(`Running on ${PORT} in ${ENV.toUpperCase()}`));