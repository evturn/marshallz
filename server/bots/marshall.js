'use strict';
const Cron = require('cron').CronJob;
const Author = require('./author');
const Twitter = require('twitter');

const Marshall = new Author({
  name: "Marshall",
  username: "marshall",
  avatar: "images/av-marshall.png",
  filepath: "server/bots/marshall.txt",
  post: function() {
    return new Cron(this.jobs.twitter, () => this.postToTwitter(), null, true);
  },
  jobs: {
    realtwitter: "00 00 01,04,07,10,13,16,22 * * *",
    blog: "00 00,30 * * * *"
  },
  social: {
    twitter: "https://twitter.com/marshallzBlog"
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
  policy: 4,
  keywords: [
    "1980", "cars", "dog", "kids", "retro", "commercial", "1990", "80\"s", "90\"s", "cartoons", "Gary+Busey,", "cool", "rad", "rollerblade", "huffy", "moonbounce", "big+wheels", "shredder", "steve+guttenberg", "mattel", "WWF", "WCW", "NWO", "slimer", "shaq", "mutombo", "macho+man", "razor+ramon", "keith+sweat", "skeletor", "snuggles", "dude"
  ]
});

module.exports = Marshall;