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
    'https://rss.sciencedaily.com/health_medicine/irritable_bowel_syndrome.xml',
    'https://rss.sciencedaily.com/strange_offbeat.xml',
    'https://rss.sciencedaily.com/mind_brain/ecstasy.xml',
    'https://rss.sciencedaily.com/health_medicine/dietary_supplements.xml',
    'https://rss.sciencedaily.com/matter_energy/electricity.xml',
    'https://rss.sciencedaily.com/matter_energy/thermodynamics.xml',
    'https://rss.sciencedaily.com/matter_energy/quantum_computing.xml',
    'https://rss.sciencedaily.com/computers_math/virtual_reality.xml',
    'https://rss.sciencedaily.com/computers_math/artificial_intelligence.xml',
    'https://rss.sciencedaily.com/health_medicine/alternative_medicine.xml',
    'https://rss.sciencedaily.com/health_medicine/vegetarian.xml'
  ]
}