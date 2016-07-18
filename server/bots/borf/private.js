module.exports = {
  jobs: { blog: '30 07,53 * * * *' },
  keys: { giphy: process.env.GIPHY_DEV },
  file: 'src/server/bots/borf/content.txt',
  rss: [
    'https://rss.nytimes.com/services/xml/rss/nyt/WeekinReview.xml',
    'https://rss.sciencedaily.com/matter_energy/thermodynamics.xml',
    'https://rss.sciencedaily.com/computers_math/virtual_reality.xml',
    'https://rss.sciencedaily.com/matter_energy/electricity.xml'
  ]
}
