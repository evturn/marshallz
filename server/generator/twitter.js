import { Author } from '../models'
import Generator from './sg'
import Twitter from 'twitter'

export default function twitter(author, data) {
  const request = new Twitter(author.twitter.keys)

  createStatus(Generator(data), createRequest(request))
}

function createRequest(request) {
  return body => {
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
  return status.length > 140 ? createStatus(genFn) : requestFn({ status })
}