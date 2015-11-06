'use strict';
const Cron = require('cron').CronJob;
const jobs = require('./jobs.json');
const toTwitter = require('../twitter');
const toBlog = require('../builder/blog');

module.exports = () => {

  const exec = (crontab, fn) => {
    return new Cron(crontab, () => {
      fn();
    }, null, true);
  };

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