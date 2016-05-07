import { Observable } from 'rx'
import SentenceGenerator from 'sentence-generator'
import request from 'request'

export default bot => {
  const bot$ = Observable.from([bot]);

  const status$ = bot$
    .map(createTwitterStatus)

  const credentials$ = bot$
    .map(x => x.keys.twitter)

  const payload$ = Observable.combineLatest(
      credentials$,
      status$
    )
    .map(postStatusToTwitter)
    .subscribe(
      x => console.log('\n\n\n', x),
      e => console.log('we errored', e.message),
      x => console.log('we complete.')
    )
}

function postStatusToTwitter(payload) {
  const [ credentials, status ] = payload

  console.log(status)

  credentials.post('statuses/update', { status }, (error, tweet, response) => {
    if (error) {
      console.log(error)
    }

    console.log(JSON.parse(response.body))
  })

  return status;
}