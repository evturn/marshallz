'use strict';
const Handlebars = require('express-handlebars');
const helpers = require('../../shared/hbs-helpers');

module.exports = Handlebars.create({
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: helpers,
  partialsDir: ['views/partials'],
  layoutsDir: 'views/layouts'
});