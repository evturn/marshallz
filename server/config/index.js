'use strict';
const express = require('express');
const app = module.exports = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const helpers = require('../../shared/hbs-helpers').helpers;
const scheduler = require('../lib/scheduler')();

const port = process.env.PORT || 3000;
const assets = 'client/dist';
const templates = 'views/partials';
const logger = morgan('dev');
const hbs = handlebars.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: helpers,
  partialsDir: [
    'views/partials'
  ],
  layoutsDir: 'views/layouts'
});

mongoose.connect('mongodb://localhost/marshallz');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('DB connected'); });

app.set('port', port);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

require('../controllers/middleware')(app);

app.use('/', express.static(templates));

app.use('/', express.static(assets));
app.use('/posts/:id', express.static(assets));
app.use('/author/:username', express.static(assets));

app.use(logger);

require('../routes')(app);

app.listen(port, () => { console.log(`Express listening on port ${port}`); });