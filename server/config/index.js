'use strict';
const express = require('express');
const db = require('./mongo');
const logger = require('morgan');
const hbs = require('./views');

const scheduler = require('../lib/scheduler')();
const middleware = require('./middleware');
const setAuthors = middleware.setAuthors;
const activePage = middleware.activePage;

const assets = 'client/dist';
const templates = 'views/partials';


const app = exports = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.set('etag', false);
app.use(setAuthors);
app.use(activePage);
app.use('/', express.static(templates));
app.use('/author/:username/:page', express.static(assets));
app.use('/author/:username/:page', express.static(templates));
app.use('/', express.static(assets));
app.use('/posts/:id', express.static(assets));
app.use('/author/:username', express.static(assets));
app.use(logger('dev'));
require('../routes')(app);
app.listen(app.get('port'), () => console.log(`Express listening on port ${app.get('port')}`));