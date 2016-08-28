import { Author } from '../models'
import Generator from './sg'
import Twitter from 'twitter'

export default async function twitter(_id, content) {
  const generator = Generator(content)
  const body = createStatus(generator)
  try {
    const author = await findAuthor(_id)
    const req = attachCredentials(author.twitter.keys)
    const newTweet = await callTwitterAPI(req, body)
  } catch (e) {
    console.log(e)
  }
}

function createStatus(generator) {

  function writeText(acc) {
    acc += generator() + '. '
    if (acc.length < 100) {
      return writeText(acc)
    }
    return acc.trim()
  }

  const status = writeText('')

  if (status.length > 140) {
    return createStatus(generator)
  } else {
    return { status }
  }
}

function findAuthor(_id) {
  return Author
    .findById(_id)
    .exec()
}

function attachCredentials(keys) {
  return new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.token_key,
    access_token_secret: keys.token_secret,
  })
}

function callTwitterAPI(req, body) {
  return new Promise((resolve, reject) => {
    req.post('statuses/update', body, (err, tweet, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(res.body))
      }
    })
  })
}
