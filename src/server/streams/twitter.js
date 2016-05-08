import { Observable } from 'rx'
import SentenceGenerator from 'sentence-generator'
import { twitter as log } from '../../webpack/dev-logger'

export default bot => {
  Observable.from([bot])
    .map(createPayload)
    .flatMap(postStatusUpdate)
    .subscribe(log.twitter)
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