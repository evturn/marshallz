const Twitter = require('twitter')

module.exports = {
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
    'https://rss.sciencedaily.com/health_medicine/irritable_bowel_syndrome.xml',
    'https://rss.sciencedaily.com/strange_offbeat.xml',
    'https://rss.sciencedaily.com/matter_energy/quantum_computing.xml',
    'https://rss.sciencedaily.com/computers_math/artificial_intelligence.xml'
  ]
}
