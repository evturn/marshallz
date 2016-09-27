import fs from 'fs'
import { CronJob } from 'cron'
import { Author } from '../models'
import blog from './blog'
import twitter from './twitter'

function startCronJobs() {
  Author
    .find()
    .select('blog.cronjob twitter.cronjob content')
    .exec()
    .then(createActions)
    .then(dispatchJobs)
}

function dispatch(action) {
  fs.readFile(action.content, (err, data) => {
    switch (action.type) {
      case 'blog':
        return blog(action._id, data.toString())
      case 'twitter':
        return twitter(action._id, data.toString())
    }
  })
}

function createBlogAction(author) {
  return {
    action: _ => dispatch({ type: 'blog', _id: author._id, content: `assets/${author.content}` }),
    cronjob: author.blog.cronjob,
  }
}

function createTwitterAction(author) {
  return {
    action: _ => dispatch({ type: 'twitter', _id: author._id, content: `assets/${author.content}` }),
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

export default startCronJobs()
