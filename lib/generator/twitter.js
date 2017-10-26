import Twitter from 'twitter'

const getCharacterLimit = () => {
  const min = 20;
  const max = 70;
  const rand = Math.floor(Math.random() * max);
  return min + rand;
};

const phraseTerminatesProperly = value => {
  const articles = [`a`, `the`, `it's`, 'and'];
  const words = value.split(' ');
  const last = words[words.length - 1];
  return !articles.find(x => x === last.toLowerCase());
};

export default function twitter({ author, gen }) {
  const postToTwitter = callAPI(author.twitter.keys)
  const threshold = getCharacterLimit();

  function writeText() {
    const value = gen.generate()
    if (value.length > 140) {
      gen.clear()
      return writeText()
    } else if (value.length > threshold && phraseTerminatesProperly(value)) {
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
