'use strict';
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore =  require('connect-mongo')(session);
const path = require('path');
const secrets = require('./secrets');
const flash = require('express-flash');
const methodOverride = require('method-override');

module.exports = function (app, passport) {
  app.set('port', (process.env.PORT || 3000));
  app.disable('x-powered-by __clang__');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view cache', false);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));
  app.set('trust proxy', 'loopback');
  const sess = {
    resave: true,
    saveUninitialized: false,
    secret: secrets.sessionSecret,
    proxy: true,
    name: 'sessionId',
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new MongoStore(
      {
        url: secrets.db,
        autoReconnect: true
      }
    )
  };

  const node_env = process.env.NODE_ENV;
  console.log('Environment: ' + node_env);
  if(node_env === 'production') {
    sess.cookie.secure = true;
  }
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

};
