'use strict';
const giphy = require('./giphy');
const Post = require('./post');
const BlogPost = require('../../../models/blog-post');
const user = {
  author: 'Marshall',
  username: 'marshall',
  policy: 4,
  keywords: [
    '1980', 'cars', 'dog', 'kids', 'retro', 'commercial', '1990', '80\'s', '90\'s', 'cartoons', 'Gary+Busey,', 'cool', 'rad', 'rollerblade', 'huffy', 'moonbounce', 'big+wheels', 'shredder', 'steve+guttenberg', 'mattel', 'WWF', 'WCW', 'NWO', 'slimer', 'shaq', 'mutombo', 'macho+man', 'razor+ramon', 'keith+sweat', 'skeletor', 'snuggles', 'dude'
  ],
  filepath: 'server/lib/builder/quotes.txt'
};

module.exports = () => {
  const media = giphy(user);
  const copy = new Post(user);
  Promise.all([media, copy])
    .then((values) => {
      console.log(values);
      return values;
    })
    .catch((err) => {
      throw new Error(`Couldn't grab your shit.`, err);
    });
};