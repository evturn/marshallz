'use strict';

let path = require('path'),
    Twitter = require('twitter');

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
  twitter: new Twitter({
    consumer_key        : process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
    consumer_secret     : process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
    access_token_key    : process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
    access_token_secret : process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
  }),

};