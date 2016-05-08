import { Observable } from 'rx'
import bots from '../bots'
import blogStream from './blog'
import twitterStream from './twitter'
import rssStream from './rss'
import { CronJob as Cron } from 'cron'
import { cron as log } from '../../webpack/dev-logger'

function main() {
  const bots$ = Observable.from(bots)

  if (__DEV__) {
    rssStream(bots[2])
  }

  const blog$ = bots$
    .filter(x => x.jobs.blog)
    .map(x => {
      new Cron(x.jobs.blog, _ => blogStream(x), null, true)
      return log.blog(x)
    })

  const twitter$ = bots$
    .filter(x => x.jobs.twitter)
    .map(x => {
      new Cron(x.jobs.twitter, _ => twitterStream(x), null, true)
      return log.twitter(x)
    })

  Observable.merge(blog$, twitter$)
    .subscribe(log.observer)
}

export default main()