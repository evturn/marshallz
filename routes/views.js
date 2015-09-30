'use strict';

let handlebars = require('express-handlebars');

module.exports = handlebars.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/partials',
  layoutsDir: 'views/layouts'
});