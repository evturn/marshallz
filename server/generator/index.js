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
  author.cronjobs.map(x => {
    return new CronJob(x.cron, dispatchJob(x.type, author), null, true)
  })
}

function dispatchJob(jobType, author) {
  const jobFn = jobType === 'twitter' ? twitter : blog
  return _ => {
    fs.readFile(`assets/${author.content}`, (e, data) => {
      if (!e && data) {
        jobFn(author, data.toString())
      }
    })
  }
}

export default startCronJobs()