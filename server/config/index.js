'use strict';
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const helpers = require('../../shared/hbs-helpers');

module.exports = {
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