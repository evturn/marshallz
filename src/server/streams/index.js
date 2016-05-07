import { Observable } from 'rx'
import bots from '../bots'
import blogStream from './blog'
import twitterStream from './twitter'
import { CronJob as Cron } from 'cron'

function main() {
  const bots$ = Observable.from(bots)

  const blog$ = bots$
    .filter(x => x.jobs.blog)
    .map(x => {
      new Cron(x.jobs.blog, _ => blogStream(x), null, true)
      return ` \x1b[37m Blog   \x1b[31m -> \x1b[32m ${x.name}`
    })

  const twitter$ = bots$
    .filter(x => x.jobs.twitter)
    .map(x => {
      new Cron(x.jobs.twitter, _ => twitterStream(x), null, true)
      return `\x1b[37m Twitter \x1b[31m -> \x1b[32m ${x.name}`
    })


  Observable.merge(blog$, twitter$)
    .subscribe(
      x => console.log(`〰️〰️〰️〰️〰️〰️〰️${x}`),
      e => console.log(e),
      x => console.log(`\n\x1b[37m〰️〰️〰️〰️〰️〰️〰️ Stream running 〰️〰️〰️〰️〰️〰️〰️️\n`)
    )
}

export default main()