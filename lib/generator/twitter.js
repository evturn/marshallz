import Twitter from 'twitter'

export default function twitter({ author, gen }) {
  const postToTwitter = callAPI(author.twitter.keys)

  function writeText() {
    const value = gen.generate()
    if (value.length > 140) {
      gen.clear()
      return writeText()
    } else if (value.length > author.threshold) {
      return postToTwitter(value)
    } else {
      return writeText()
    }
  }

  writeText()
}

function callAPI(keys) {
  const request = new Twitter({
    access_token_key: process.env[keys.access_token_key],
    access_token_secret: process.env[keys.access_token_secret],
    consumer_key: process.env[keys.consumer_key],
    consumer_secret: process.env[keys.consumer_secret],
  })
  return status => {
    request.post('statuses/update', { status }, (e, tweet, res) => {
      if (e) { console.log(e.message) }
    })
  }
}