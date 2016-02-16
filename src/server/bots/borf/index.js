import Bot from '../bot';

export default new Bot({
  name: 'b0rf',
  username: 'borf',
  avatar: 'av-borf.png',
  index: 2,
  keywords: 'src/server/bots/borf/keywords.txt',
  content: 'src/server/bots/borf/content.txt',
  social: false,
  jobs: [
    {
      type: 'blog',
      crontab: '30 07,53 * * * *'
    }
  ],
  keys: {
    giphy: process.env.GIPHY_DEV
  }
});