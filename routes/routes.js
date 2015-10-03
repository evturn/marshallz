'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router(),
    posts = express.Router();

exports.app = app.get('/', middleware.index);
exports.posts = posts.get('/:id/:slug', middleware.detail);