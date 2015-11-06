'use strict';
const express = require('express');
const app = module.exports = express();
const o_O = require('./server/config');
const scheduler = require('./server/lib/scheduler')();

app.engine('hbs', o_O.hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.set('port', o_O.port);
app.use('/', o_O.static.dist);
app.use('/pages', o_O.static.hbs);
app.use('/posts/:id', o_O.static.dist);
o_O.router(app);
app.listen(o_O.port, o_O.isListening());