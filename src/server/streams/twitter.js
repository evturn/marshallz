import { Observable } from 'rx'
import SentenceGenerator from 'sentence-generator'

export default bot => {
  Observable.from([bot])
    .map(createPayload)
    .flatMap(postStatusUpdate)
    .subscribe(
      x => console.log('\n\n\n', x.text),
      e => console.log('we errored', e.message),
      x => console.log('we complete.')
    )
}

function createPayload(x) {
  return {
    status: SentenceGenerator({ file: x.content, count: 16 })(),
    credentials: x.keys.twitter
  }
}

function postStatusUpdate({ credentials, status }) {
  return Observable.create(x => {
    credentials.post(
      'statuses/update',
      { status },
      (error, tweet, response) => {
        if (error) {
          x.onError(error)
        }
        x.onNext(JSON.parse(response.body))
      }
    )
  })
}