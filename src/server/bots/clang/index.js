import Bot from '../bot';
import Twitter from 'twitter';

export default new Bot({
  name: '__clang__',
  username: 'clang',
  avatar: 'av-clang.png',
  index: 1,
  keywords: 'src/server/bots/clang/keywords.txt',
  content: 'src/server/bots/clang/content.txt',
  jobs: [
    {
      type: 'blog',
      crontab: '00 15,45 * * * *'
    },{
      type: 'twitter',
      crontab: '00 00 00,03,06,09,12,15,21 * * *'
    }
  ],
  social: true,
  share: {
    twitter: 'https://twitter.com/__clang__'
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
});