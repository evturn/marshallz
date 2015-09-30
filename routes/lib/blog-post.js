'use strict';

let Markov    = require('markovchain').MarkovChain,
    Firebase  = require('firebase'),
    firebase  = new Firebase('https://marshallz.firebaseio.com/posts'),
    composer = require('./composer');


let Entry = {
  title     : null,
  slug      : null,
  body      : null,
  timestamp : null,
  uuid      : null,
};

let phrases = [];
let length = 4;

let reset = {
  entry() {
    Entry = {
      title     : null,
      slug      : null,
      body      : null,
      timestamp : null,
      uuid      : null,
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

function buildEntry(string) {
  let isDefined = !!(string !== undefined),
      hasNoTitle = !!(Entry.title === null),
      isBelowTotal = !!(phrases.length < length),
      hasReachedTotal = !!(phrases.length === length);

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
      Entry.timestamp = Firebase.ServerValue.TIMESTAMP;
      Entry.uuid = Date.now();

      let _entry = firebase.push(Entry);
      reset.entry();
      reset.phrases();

      return _entry;
  }
};

module.exports = function init() {
  let sentence = composer();

  return new Promise(function(resolve, reject) {
    resolve(sentence)
  })
  .then(function(v) {
    let string = v;
    buildEntry(string);
  });
};