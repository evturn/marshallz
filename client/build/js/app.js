const $ = require('jquery');
const _ = require('underscore');
const livestamp = require('livestamp');
const pagination = require('./pagination');

$(document).on('ready', function() {
  pagination();
});

$(window).on('scroll', function() {
  pagination();
});