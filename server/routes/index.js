import Server from '../../public/assets/app.server';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import blogPosts from '../controllers/blogPosts';
import bots from '../bots';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/webpack.config.dev.js';

const app = express();

mongoose.connect('mongodb://localhost/marshallz');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('DB connected'));

app.set('port', (process.env.PORT || 3000));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/img', express.static(path.join(__dirname, '..', '..', 'public', 'img')));

const PORT = app.get('port');

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/blogPost', blogPosts.all, blogPosts.populateEachBotWithPosts, blogPosts.send);
app.get('/api/post/:slug', blogPosts.one);

app.get('*', (req, res, next) => Server(req, res));

app.listen(PORT, () => {
  console.log(`\x1b[44m%s\x1b[0m`,`🌐`, ` ENV: ${process.env.NODE_ENV.toUpperCase()}`);
  console.log(`\x1b[44m%s\x1b[0m`, `💻`, ` PORT: ${PORT}`);
});