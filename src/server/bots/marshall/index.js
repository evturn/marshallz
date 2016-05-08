import Twitter from 'twitter'

const _public = {
  name: 'Marshall',
  username: 'marshall',
  avatar: 'av-marshall.png',
  headshot: 'hs-marshall.png',
  social: true,
  share: { twitter: 'https://twitter.com/marshallzBlog' }
}

export default {
  ..._public,
  _public,
  content: 'src/server/bots/marshall/content.txt',
  jobs: {
    blog: '00 00,30 * * * *',
    twitter:'00 00 01,04,07,10,13,16,22 * * *'
  },
  keys: {
    twitter: new Twitter({
      consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
    }),
    giphy: process.env.GIPHY_DEV
  }
}