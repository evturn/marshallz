const _public = {
  name: 'b0rf',
  username: 'borf',
  avatar: 'av-borf.png',
  headshot: 'hs-borf.png',
  social: false,
}

export default {
  ..._public,
  _public,
  content: 'src/server/bots/borf/content.txt',
  jobs: { blog: '30 07,53 * * * *' },
  keys: { giphy: process.env.GIPHY_DEV },
  rss: [

    'http://www.people.com/web/people/rss/tvwatch/index.xml',
    'http://www.people.com/web/people/rss/topheadlines/index.xml',
    'https://rss.sciencedaily.com/health_medicine/irritable_bowel_syndrome.xml',
    'https://rss.sciencedaily.com/strange_offbeat.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
    'https://rss.sciencedaily.com/health_medicine/vegetarian.xml',
    'https://rss.sciencedaily.com/mind_brain/ecstasy.xml',
    'https://rss.sciencedaily.com/health_medicine/dietary_supplements.xml',
    'https://rss.sciencedaily.com/health_medicine/alternative_medicine.xml',
    'https://rss.sciencedaily.com/matter_energy/electricity.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/WeekinReview.xml',
    'https://rss.sciencedaily.com/matter_energy/thermodynamics.xml',
    'https://rss.sciencedaily.com/matter_energy/quantum_computing.xml',
    'https://rss.sciencedaily.com/computers_math/virtual_reality.xml',
    'https://rss.sciencedaily.com/computers_math/artificial_intelligence.xml'
  ]
}