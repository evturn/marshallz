'use strict';

let Markov    = require('markovchain').MarkovChain,
    BlogPost  = require('../../config/schema'),
    composer  = require('./composer'),
    config    = require('../../config/base'),
    request   = require('request');

let Entry, phrases, length, words;

function startLoop() {
  let query = words[Math.floor(Math.random() * words.length)];
  let url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${config.giphy}`;
  let req = new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              let responseBody = JSON.parse(body),
              data = responseBody.data;

            if (data.length) {
              let item = data[Math.floor(Math.random() * data.length)];

              resolve(item.images.original.url);
            }
          }
        });
      });
  req.then(function(val) {
    Entry.image = val;
    init();
  });
};

function init() {
  let sentence = composer();

  return new Promise(function(resolve, reject) {
    resolve(sentence);
  })
  .then(function(v) {
    buildEntry(v);
  })
  .then(function(v) {
    return v;
  });
};

function slugify(value) {

  function escapeForRegExp(value) {
  if (_.isUndefined(value)) {
    return '';
  }
  return value.toString().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  function trim(value, chars) {
    chars = escapeForRegExp(chars);
    return value.replace(new RegExp('^(' + chars + ')+|(' + chars + ')+$', 'g'), '').toLowerCase();
  }

  function toSlug(value) {
    value = value || '';
    return value.trim().replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-').replace(/^-+|-+$/g,'').toLowerCase();
  };

  return toSlug(value);
}

function buildEntry(string) {
  let isDefined = !!(string !== undefined),
      hasNoTitle = !!(Entry.title === null),
      isBelowTotal = !!(phrases.length < length),
      hasReachedTotal = !!(phrases.length === length);

  if (isDefined && hasNoTitle) {
      Entry.title = string;
      Entry.slug = slugify(string);
      init();
  }
  else if (isDefined && isBelowTotal) {
      if (string.endsWith('?' || '!')) {
          phrases.push(string);
      }
      else {
          phrases.push(string + '.');
      }
      init();
  }
  else if (hasReachedTotal) {
      let body = '';

      for (let str of phrases) {
        body = body += ' ' + str;
      }

      Entry.body = body;
      Entry.timestamp = Date.now();
      Entry.uuid = Date.now();

      let post = new BlogPost(Entry);
      post.save();
      console.log(post);

      return Entry;
  }
};

module.exports = function configure() {
  Entry = {
    title: null,
    author: 'Marshall'
  };
  phrases = [];
  length = 4;
  words = [
    '1980', 'cars', 'dog', 'kids', 'retro', 'commercial', '1990', '80\'s', '90\'s', 'cartoons', 'Gary+Busey,', 'cool', 'rad', 'rollerblade', 'huffy', 'moonbounce', 'big+wheels', 'shredder', 'steve+guttenberg', 'mattel', 'WWF', 'WCW', 'NWO', 'slimer', 'shaq', 'mutombo', 'macho+man', 'razor+ramon', 'keith+sweat', 'skeletor', 'snuggles', 'dude'
  ];

  startLoop();
};