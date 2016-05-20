import Twitter from 'twitter'

export default {
  file: 'src/server/bots/clang/content.txt',
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
  },
  rss: [
    'http://www.people.com/web/people/rss/tvwatch/index.xml',
    'http://www.people.com/web/people/rss/topheadlines/index.xml',
    'https://rss.sciencedaily.com/health_medicine/irritable_bowel_syndrome.xml',
    'https://rss.sciencedaily.com/strange_offbeat.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml'
  ]
}