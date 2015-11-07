'use strict';
const Cron = require('cron').CronJob;
const jobs = require('./jobs.json');
const init = require('./init');

module.exports = () => {

  const exec = (crontab, job, fn) => {
    return new Cron(crontab, () => {
      fn(job);
    }, null, true);
  };

  for (let job of jobs) {
    exec(job.crontab, job, init);
  }
};