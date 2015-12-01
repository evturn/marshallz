'use strict';
const express = require('express');
const db = require('./mongo');
const scheduler = require('../lib/scheduler')();

const app = exports = module.exports = express();

/**
 * App configuration.
 *
 */

app.set('port', process.env.PORT || 3000);
app.set('x-powered-by', 'evturn.com');
app.set('etag', false);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.set('loadPolicy', 20);

/* View engine.
 *
 **/

const hbs = require('./views');

app.engine('hbs', hbs.engine);

/**
 * Middleware.
 *
 */

const middleware = require('./middleware');
const setAuthors = middleware.setAuthors;
const activePage = middleware.activePage;

app.use(setAuthors);
app.use(activePage);

/**
 * Static serve.
 *
 */

const assets = 'client/dist';
const templates = 'views/partials';

app.use('/', express.static(assets));
app.use('/', express.static(templates));
app.use('/author/:username/posts', express.static(assets));
app.use('/author/:username/posts', express.static(templates));
app.use('/author/:username/page/:page', express.static(assets));
app.use('/author/:username/page/:page', express.static(templates));
app.use('/posts/:id', express.static(assets));
app.use('/author/:username', express.static(assets));

/**
 * Logger.
 *
 */

const logger = require('morgan');

app.use(logger('dev'));

/**
 * Router.
 *
 */

const router = require('../routes');

router(app);

/**
 * Bind to port.
 *
 */

app.listen(app.get('port'), () => console.log(`Express listening on port ${app.get('port')}`));