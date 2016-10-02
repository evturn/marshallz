import { Author } from '../models'
import Generator from './sg'
import Twitter from 'twitter'

export default function twitter(author, data) {
  createStatus(Generator(data), createRequest(author.twitter.keys))
}

function createRequest(keys) {
  const request = new Twitter(keys)
  return body => {
    console.log(body)
    request.post('statuses/update', body, (err, tweet, res) => {
      if (err) { console.log(err.message) }
    })
  }
}

function createStatus(genFn, requestFn) {
  function writeText(acc) {
    acc += genFn() + '. '
    if (acc.length < 100) {
      return writeText(acc)
    }
    return acc.trim()
  }

  const status = writeText('')
  if (status.length > 140) {
    return createStatus(genFn, requestFn)
  } else {
    return requestFn({ status })
  }
}