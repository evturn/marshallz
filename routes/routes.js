'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router(),
    posts = express.Router();

exports.app = app.get('/', middleware.get);
exports.posts = posts.get('/:id/:slug', middleware.detail);