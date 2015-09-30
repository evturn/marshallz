var CronJob = require('cron').CronJob;
var postToTwitter = require('./twitter-post');
var postToBlog = require('./blog-post');

var cron = {};

cron.twitterLate = new CronJob('00 00 04 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterMorning = new CronJob('00 00 10 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterAfternoon = new CronJob('00 00 16 * * *', function() {
  postToTwitter();
}, null, true);

cron.twitterEvening = new CronJob('00 00 22 * * *', function() {
  postToTwitter();
}, null, true);

cron.blog = new CronJob('00 00 * * * *', function() {
  postToBlog();
}, null, true);

module.exports = cron;