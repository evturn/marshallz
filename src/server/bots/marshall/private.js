import Twitter from 'twitter'

export default {
  file: 'src/server/bots/marshall/content.txt',
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
  },
  rss: [
    'https://rss.sciencedaily.com/health_medicine/vegetarian.xml',
    'https://rss.sciencedaily.com/mind_brain/ecstasy.xml',
    'https://rss.sciencedaily.com/health_medicine/dietary_supplements.xml',
    'https://rss.sciencedaily.com/health_medicine/alternative_medicine.xml'
  ]
}