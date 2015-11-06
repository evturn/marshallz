'use strict';
const Cron = require('cron').CronJob;
const jobs = require('./jobs.json');
const toTwitter = require('../twitter-post');
const toBlog = require('../blog-post');

module.exports = () => {

  const exec = (crontab, fn) => {
    return new Cron(crontab, () => {
      fn();
    }, null, true);
  }

  for (let job of jobs) {
    switch (job.media) {
      case 'twitter':
        exec(job.crontab, toTwitter);
        break;
      case 'blog':
        exec(job.crontab, toBlog);
        break;
    }
  }

};