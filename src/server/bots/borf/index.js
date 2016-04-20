export default {
  name: 'b0rf',
  username: 'borf',
  avatar: 'av-borf.png',
  index: 2,
  content: 'src/server/bots/borf/content.txt',
  social: false,
  jobs: {
    blog: '30 07,53 * * * *'
  },
  keys: {
    giphy: process.env.GIPHY_DEV
  },
  authorData: function() {
    return {
      name: this.name,
      username: this.username,
      avatar: this.avatar,
      index: this.index,
      social: this.social,
      share: this.share
    }
  }
}