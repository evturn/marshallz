import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import bots from '../bots';
import * as blog from './blogPosts';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Server from '../../../dist/js/ser';

const app = express();

mongoose.connect('mongodb://127.0.0.1/marshallz');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', _ => console.log('DB connected'));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(require('../../webpack/dev.js'));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', '..', '..')));

app.get('/blogPost',       blog.all, blog.populateAuthors, blog.send);
app.get('/api/post/:slug', blog.detail);

app.get('*', (req, res, next) => Server(req, res));

app.listen(3000, _ => {
  console.log(`\x1b[44m%s\x1b[0m`,`🌐`, ` Running ${process.env.NODE_ENV}`);
  console.log(`\x1b[44m%s\x1b[0m`, `💻`, ` PORT: 3000`);
});