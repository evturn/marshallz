const $ = require('jquery');
const _ = require('underscore');
const livestamp = require('livestamp');
const pagination = require('./pagination');
const nav = require('./nav');

$(document).on('ready', function() {
  nav.init();
});

$(window).on('scroll', function() {
  pagination();
});