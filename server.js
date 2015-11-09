'use strict';
const express = require('express');
const app = module.exports = express();
const o_O = require('./server/config');
const middleware = o_O.middleware(app);
const scheduler = require('./server/lib/scheduler')();

app.engine('hbs', o_O.hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.set('port', o_O.port);
o_O.static(app);
o_O.router(app);
app.listen(o_O.port, o_O.isListening());