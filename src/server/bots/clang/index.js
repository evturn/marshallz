import Twitter from 'twitter'

const _public = {
  name: '__clang__',
  username: 'clang',
  avatar: 'av-clang.png',
  headshot: 'hs-clang.png',
  social: true,
  share: { twitter: 'https://twitter.com/__clang__' }
}

export default {
  ..._public,
  _public,
  content: 'src/server/bots/clang/content.txt',
  jobs: {
    blog: '00 15,45 * * * *',
    twitter: '00 00 00,03,06,09,12,15,21 * * *'
  },
  keys: {
    twitter: new Twitter({
      consumer_key: process.env.CLANG_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.CLANG_TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.CLANG_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.CLANG_TWITTER_TOKEN_SECRET
    }),
    giphy: process.env.GIPHY_DEV
  }
}