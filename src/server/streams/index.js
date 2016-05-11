import { Observable } from 'rx'
import bots from '../bots'
import blogStream from './blog'
import twitterStream from './twitter'
import rss$ from './rss'
import { CronJob as Cron } from 'cron'
import { cron as cronlog, rss as rsslog } from '../../webpack/dev-logger'
import borf$ from './borf'

function main() {
  const bots$ = Observable.from(bots)


  rss$(bots[2])
    .flatMap(borf$)
    .subscribe(rsslog.observer)



  // const blog$ = bots$
  //   .filter(x => x.jobs.blog)
  //   .map(x => {
  //     new Cron(x.jobs.blog, _ => blogStream(x), null, true)
  //     return log.blog(x)
  //   })

  // const twitter$ = bots$
  //   .filter(x => x.jobs.twitter)
  //   .map(x => {
  //     new Cron(x.jobs.twitter, _ => twitterStream(x), null, true)
  //     return log.twitter(x)
  //   })

  // Observable.merge(blog$, twitter$)
  //   .subscribe(log.observer)
}

export default main()