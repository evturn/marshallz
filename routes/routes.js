'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router(),
    pages = express.Router(),
    posts = express.Router();

exports.app = app.get('/', middleware.index);
exports.pages = pages.get('/:page', middleware.page);
exports.detail = posts.get('/:id/:slug', middleware.detail);