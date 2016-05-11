import { Observable } from 'rx'
import RxNode from 'rx-node'
import bots from '../bots'

// import blogStream from './blog'
// import twitterStream from './twitter'
// import { CronJob as Cron } from 'cron'

import request from 'request'
import FeedParser from 'feedparser'
import { cron as cronlog, rss as rsslog } from '../../webpack/dev-logger'
import borf$ from './borf'

let j = 0
const d = x => console.log(`============START=============\n\n\nValue:\n${x}\n \nType:\n${typeof x}\n \nIndex:\n${i += 1}\n\n\n==============END=============\n\n${j += 1}\n\n`)

const fakeHeader = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
const opts = x => ({
  url: x,
  pool: false,
  timeout: 10000,
  headers: {
    'user-agent': fakeHeader,
    'accept': 'text/html,application/xhtml+xml'
  }
})


function main() {

  const bot$ = Observable.of(bots[2])
  const url$ = bot$.map(x => x.rss[Math.floor(Math.random() * x.rss.length)])

  const req$ = url$.flatMap(x => {
    const fp = new FeedParser()
    const req = request(x, { timeout: 10000, pool: false })
    req.setMaxListeners(50)
    req.setHeader('user-agent', fakeHeader)
    req.setHeader('accept', 'text/html,application/xhtml+xml')
    req.on('response', x => x.pipe(fp))
    return RxNode.fromTransformStream(fp)
  })


  const res$ = req$
  .buffer(_ => Observable.timer(3000))
  .flatMap(borf$)
  .subscribe(rsslog.observer)
}





  // Observable.from([  ])
  //   .map(x => {
  //     x.setMaxListeners(50)
  //     x.setHeader('user-agent', fakeHeader)
  //     x.setHeader('accept', )
  //     return x
  //   })
  //   .flatMap(x => {
  //     x.on('error', e => console.log(e, e.stack))
  //     x.on('response', res => res.pipe(fp))
  //     return
  //   })

export default main()

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