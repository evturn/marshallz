import fs from 'fs'
import { CronJob } from 'cron'
import { Author } from '../models'
import blog from './blog'
import twitter from './twitter'

function startCronJobs() {
  Author
    .find()
    .exec()
    .then(xs => {
      return xs
        .map(x => x.toObject())
        .map(createAuthorJobs)
    })
    .catch(e => console.log(e))
}

function createAuthorJobs(author) {
  author.cronjobs.map(({ type, cron }) => {
    const jobFn = type === 'twitter' ? twitter : blog
    return new CronJob(cron, dispatchJob(author, jobFn), null, true)
  })
}

function dispatchJob(author, jobFn) {
  return _ => {
    fs.readFile(`assets/${author.content}`, (e, data) => {
      if (!e && data) {
        jobFn(author, data.toString())
      }
    })
  }
}

export default startCronJobs()