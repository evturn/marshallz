'use strict';
const Cron = require('cron').CronJob;
const postToTwitter = require('./twitter-post');
const postToBlog = require('./blog-post');

const jobs = [
  {
    media: 'twitter',
    time: '4:00am',
    repeats: 'daily',
    crontab: '00 00 04 * * *'
  }, {
    media: 'twitter',
    time: '10:00am',
    repeats: 'daily',
    crontab: '00 00 10 * * *'
  }, {
    media: 'twitter',
    time: '2:00pm',
    repeats: 'daily',
    crontab: '00 00 16 * * *'
  }, {
    media: 'twitter',
    time: '10:00pm',
    repeats: 'daily',
    crontab: '00 00 22 * * *'
  }, {
    media: 'blog',
    time: '*:00am',
    repeats: 'hourly',
    crontab: '00 00 * * * *'
  }
];

cron.twitterFourAM = new Cron('00 00 04 * * *', () => {
  postToTwitter();
}, null, true);

cron.twitterTenAM = new Cron('00 00 10 * * *', () => {
  postToTwitter();
}, null, true);

cron.twitterTwoPM = new Cron('00 00 16 * * *', () => {
  postToTwitter();
}, null, true);

cron.twitterTenPM = new Cron('00 00 22 * * *', () => {
  postToTwitter();
}, null, true);

cron.blogHourly = new Cron('00 00 * * * *', () => {
  postToBlog();
}, null, true);

module.exports = cron;
