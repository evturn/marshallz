'use strict';

let handlebars = require('express-handlebars');

module.exports = handlebars.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: new require('../views/helpers/handlebars-helpers')(),
  partialsDir: 'views/partials',
  layoutsDir: 'views/layouts'
});