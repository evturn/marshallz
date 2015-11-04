'use strict';
const Cron = require('cron').CronJob;
const postToTwitter = require('./twitter-post');
const postToBlog = require('./blog-post');
const cron = {};

cron.twitterFourAM = new Cron('00 00 04 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterTenAM = new Cron('00 00 10 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterTwoPM = new Cron('00 00 16 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterTenPM = new Cron('00 00 22 * * *', function() {
  postToTwitter();
}, null, true);

cron.blogHourly = new Cron('00 00 * * * *', function() {
  postToBlog();
}, null, true);

module.exports = cron;
