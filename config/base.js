'use strict';

let path = require('path'),
    Twitter = require('twitter'),
    handlebars = require('express-handlebars');

module.exports = {

  database: function(mongoose) {
    mongoose.connect('mongodb://localhost/marshallz');
    mongoose.connection.on('error',
      console.error.bind(console,
        'connection error:'));
    mongoose.connection.once('open',
      function callback() {
        console.log('DB connected');
    });
  },
  hbs: handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: new require('../shared/handlebars-helpers')(),
    partialsDir: 'views/partials',
    layoutsDir: 'views/layouts'
  }),
  twitter: new Twitter({
    consumer_key        : process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
    consumer_secret     : process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
    access_token_key    : process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
    access_token_secret : process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
  }),
  giphy: process.env.GIPHY_DEV,

};