'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function (app) {
  app.set('port', (process.env.PORT || 3000));
  app.disable('x-powered-by __clang__');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view cache', false);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(path.join(__dirname, '../..', 'public')));
  app.set('trust proxy', 'loopback');
  const node_env = process.env.NODE_ENV;
  console.log('Environment: ' + node_env);
};
