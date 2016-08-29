import { CronJob } from 'cron'
import { Author } from '../models'
import dispatch from './dispatch'

export default function startCronJobs() {
  Author
    .find()
    .select('blog.cronjob twitter.cronjob')
    .exec()
    .then(createActions)
    .then(dispatchJobs)
}

function createBlogAction(author) {
  return {
    action: _ => dispatch({ type: 'blog', _id: author._id }),
    cronjob: author.blog.cronjob,
  }
}

function createTwitterAction(author) {
  return {
    action: _ => dispatch({ type: 'twitter', _id: author._id }),
    cronjob: author.twitter.cronjob,
  }
}

function createActions(authors) {
  return authors.reduce((acc, x) => {
    acc.push(createBlogAction(x))
    if (x.twitter.cronjob) {
      acc.push(createTwitterAction(x))
    }
    return acc
  }, [])
}

function dispatchJobs(jobs) {
  return jobs.map(x => new CronJob(x.cronjob, x.action, null, true))
}

