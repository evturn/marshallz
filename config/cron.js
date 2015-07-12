var CronJob = require('cron').CronJob;
var tweet = require('./tweets');
var post = require('./posts');

var cron = {};

cron.twitterLate = new CronJob('00 00 04 * * *', function() {
  tweet();
}, null, true);

cron.twitterMorning = new CronJob('00 00 10 * * *', function() {
  tweet();
}, null, true);

cron.twitterAfternoon = new CronJob('00 00 16 * * *', function() {
  tweet();
}, null, true);

cron.twitterEvening = new CronJob('00 00 22 * * *', function() {
  tweet();
}, null, true);

module.exports = cron;