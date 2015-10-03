'use strict';

let CronJob = require('cron').CronJob,
    postToTwitter = require('./twitter-post'),
    postToBlog = require('./blog-post'),
    cron = {};

cron.twitterFourAM = new CronJob('00 00 04 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterTenAM = new CronJob('00 00 10 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterTwoPM = new CronJob('00 00 16 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterTenPM = new CronJob('00 00 22 * * *', function() {
  postToTwitter();
}, null, true);

cron.blogHourly = new CronJob('* * * * * *', function() {
  postToBlog();
}, null, true);

module.exports = cron;
