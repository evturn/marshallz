'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router();

app.get('/', middleware.get);
app.get('/posts', middleware.posts);
app.get('/posts/:uuid/:slug', middleware.detail);

module.exports = app;