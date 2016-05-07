import bots from '../bots'
import blogStream from './blog'
import twitterStream from './twitter'
import { CronJob as Cron } from 'cron'

// function scheduleJobs(x) {
//   new Cron(jobs.blog, () => postToBlog(username), null, true)

//   if (jobs.twitter) {
//     new Cron(jobs.twitter, () => postToTwitter(username), null, true)
//   }
// }

export default twitterStream(bots[1])