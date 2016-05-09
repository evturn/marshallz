import request from 'request'
import FeedParser from 'feedparser'
import { Observable } from 'rx'
import RxNode from 'rx-node'
import borf from './borf'

const fakeHeader = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'

export default bot => {
  const url = bot.rss[Math.floor(Math.random() * bot.rss.length)]
  const fp = new FeedParser()

  Observable.from([ request(url, { timeout: 10000, pool: false }) ])
    .map(x => {
      x.setMaxListeners(50)
      x.setHeader('user-agent', fakeHeader)
      x.setHeader('accept', 'text/html,application/xhtml+xml')
      return x
    })
    .flatMap(x => {
      x.on('error', e => console.log(e, e.stack))
      x.on('response', res => res.pipe(fp))
      return RxNode.fromTransformStream(fp)
    })
    .reduce((acc, x) => `${acc + x.summary}`, '')
    .map(x => {

      borf({
        json: x,
        count: 16
      })
    })
    .subscribe(
      x => console.log(`Not passing it back yet, so it's`, x),
      e => console.log(e),
      x => console.log('Bye.')
    )
}
