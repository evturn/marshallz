'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router();

app.get('/', middleware.get);
app.get('/api', middleware.twitter);

module.exports = app;