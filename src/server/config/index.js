import path from 'path';
import bots from '../bots';
import express from 'express';
import mongoose from 'mongoose';
import routes from '../routes';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../webpack.config.dev.js';

const ENV = process.env.NODE_ENV;
const HOST = process.env.HOST || '127.0.0.1';
const DB = process.env.DB || 'marshallz';
const PORT = 3000;
const STATIC = {
  public: path.join(__dirname, '..', '..', '..', 'public'),
  img: path.join(__dirname, '..', '..', '..', 'public', 'img')
};

const app = express();

mongoose.connect(`mongodb://${HOST}/${DB}`);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('DB connected'));

app.set('port', PORT);
app.disable('x-powered-by');
app.use(express.static(STATIC.public));
app.use('/img', express.static(STATIC.img));

if (ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

routes(app);

app.listen(PORT, () => {
  console.log(`\x1b[44m%s\x1b[0m`,`🌐`, ` NODE_ENV: ${ENV}`);
  console.log(`\x1b[44m%s\x1b[0m`, `💻`, ` PORT: ${PORT}`);
});