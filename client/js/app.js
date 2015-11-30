const $ = require('jquery');
const _ = require('underscore');
const livestamp = require('livestamp');
const pagination = require('./pagination');
const nav = require('./nav');
const view = require('view');

$(document).on('ready', function() {
  view.helpers();
  nav.init();
});

$(window).on('scroll', function() {
  pagination.init();
});