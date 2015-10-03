'use strict';

let Markov    = require('markovchain').MarkovChain,
    BlogPost  = require('../../config/schema'),
    composer  = require('./composer'),
    config = require('../../config/base'),
    request = require('request');

let Entry = {
  title     : null,
  slug      : null,
  body      : null,
  timestamp : null,
  uuid      : null,
  image     : null,
  keyword   : null,
};

let phrases = [];
let length = 4;

function init() {
  let sentence = composer();

  return new Promise(function(resolve, reject) {
    resolve(sentence);
  })
  .then(function(v) {
    let string = v;
    createQuery();
    buildEntry(string);
  })
  .then(function(v) {
    return v;
  });
};

function createQuery() {
  let words = ['1980', 'cars', 'dog', 'kids', 'retro', 'commercial', '1990', '80\'s', '90\'s', 'cartoons', 'Gary+Busey,', 'cool', 'rad', 'rollerblade', 'huffy', 'moonbounce', 'big+wheels', 'shredder', 'steve+guttenberg', 'mattel', 'WWF', 'WCW', 'NWO', 'slimer'],
      query = words[Math.floor(Math.random() * words.length)];

  return requestGif(query);
};

function requestGif(query) {
  request(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${config.giphy}`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let responseBody = JSON.parse(body),
          data = responseBody.data;

      if (data.length) {
        let item = data[Math.floor(Math.random() * data.length)];

        Entry.image = item.images.original.url;
      }
    }
  });
  return Entry;
};

function buildEntry(string) {
  let isDefined = !!(string !== undefined),
      hasNoTitle = !!(Entry.title === null),
      isBelowTotal = !!(phrases.length < length),
      hasReachedTotal = !!(phrases.length === length);

  let reset = {
    entry() {
      Entry = {
        title     : null,
        slug      : null,
        body      : null,
        timestamp : null,
        uuid      : null
      };
    },
    phrases() {
      phrases = [];
    }
  };

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

  if (isDefined && hasNoTitle) {
      Entry.title = string;
      Entry.slug = toSlug(string);
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

      let _entry = new BlogPost(Entry);
      reset.entry();
      reset.phrases();
      _entry.save();
      console.log(_entry);

      return _entry;
  }
};

module.exports = init;