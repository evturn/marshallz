import Twitter from 'twitter'

export default {
  name: 'Marshall',
  username: 'marshall',
  avatar: 'av-marshall.png',
  headshot: 'hs-marshall.png',
  index: 0,
  social: true,
  share: { twitter: 'https://twitter.com/marshallzBlog' },
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
  },
  authorData: function() {
    return {
      name: this.name,
      username: this.username,
      avatar: this.avatar,
      index: this.index,
      social: this.social,
      share: this.share,
      headshot: this.headshot
    }
  }
}