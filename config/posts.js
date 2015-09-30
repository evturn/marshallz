'use strict';

let Markov    = require('markovchain').MarkovChain,
    Firebase  = require('firebase'),
    firebase  = new Firebase('https://marshallz.firebaseio.com/posts'),
    utils = require('../shared/utils');


module.exports = function() {

  let Entry = {
    title     : null,
    slug      : null,
    body      : null,
    timestamp : null
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


  let Composer = {
    phrases: [],
    length: 4,
    init: function() {
      let fragment = new Markov({files: 'quotes.txt'});
      fragment
        .start(Composer.capitalize)
        .end()
        .process(function(err, sentence) {
          if (err) {
            console.log(err);
          }
          else {
            Composer.callback(sentence);
          }
      });
    },
    capitalize: function(wordList) {
      let tmpList = Object.keys(wordList).filter(function(word) {
        return word[0] >= 'A' && word[0] <= 'Z';
      });

      return tmpList[~~(Math.random()*tmpList.length)];
    },
    callback: function(string) {
      if (string !== undefined && Entry.title === null) {
          Entry.title = string;
          Entry.slug = toSlug(string);
      }
      else if (string !== undefined && Composer.phrases.length < Composer.length) {
          if (string.endsWith('?' || '!')) {
              Composer.phrases.push(string);
          }
          else {
              Composer.phrases.push(string + '.');
          }
      }
      else if (Composer.phrases.length === Composer.length) {
          let body = '';

          for (let str of Composer.phrases) {
            body = body += ' ' + str;
          }

          Entry.body = body;
          Entry.timestamp = Firebase.ServerValue.TIMESTAMP;

          let _entry = firebase.push(Entry);

          return Entry;
      }

      Composer.init();
    }

  };

Composer.init();

};