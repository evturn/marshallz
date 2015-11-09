'use strict';
const express = require('express');
const middleware = require('../controllers/middleware');
const mongoose = require('mongoose');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const helpers = require('../../shared/hbs-helpers').helpers;

module.exports = {
  middleware(app) {
    var locals = middleware;
    for (let fn in locals) {
      app.use(middleware[fn]);
    }
  },
  mongo: () => {
    mongoose.connect('mongodb://localhost/marshallz');
    mongoose.connection.on('error',
      console.error.bind(console,
        'connection error:'));
    mongoose.connection.once('open',
      () => {
        console.log('DB connected');
    });
  }(),
  hbs: handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: helpers,
    partialsDir: [
      'views/partials'
    ],
    layoutsDir: 'views/layouts'
  }),
  static: {
    dist: express.static('client/dist'),
    hbs: express.static('views/partials')
  },
  router: (app) => {
    require('../routes')(app);
  },
  port: process.env.PORT || 3000,
  logger: morgan('dev'),
  isListening: () => {
    console.log('Express listening on 3000');
  }
};
