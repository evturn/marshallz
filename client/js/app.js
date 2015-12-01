const $ = require('jquery');
const _ = require('underscore');
const view = require('./view');
const livestamp = require('livestamp');
const pagination = require('./pagination');
const nav = require('./nav');

view.init();

$(document).on('ready', function() {
  nav.init();
});

$(window).on('scroll', function() {
  pagination.init();
});