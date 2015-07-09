var CronJob = require('cron').CronJob;
var tweet = require('./tweets');

var cron = {};

cron.twitter = new CronJob('* * * * * *', function() {

  console.log(tweet());
}, null, true);



module.exports = cron;