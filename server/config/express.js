var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore =  require('connect-mongo')(session);
var path = require('path');
var secrets = require('./secrets');
var flash = require('express-flash');
var methodOverride = require('method-override');

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
  var sess = {
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

  var node_env = process.env.NODE_ENV;
  console.log('Environment: ' + node_env);
  if(node_env === 'production') {
    sess.cookie.secure = true;
  }
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

};
