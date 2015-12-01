'use strict';
const Handlebars = require('handlebars');
const helpers = require('hbs-helpers');

const View = exports = module.exports = {
  cache: [],
  init: function init() {
    for (let fn in helpers) {
      Handlebars.registerHelper(fn, helpers[fn]);
    }
    return Handlebars;
  },
  templates: {
    posts: {
      index: 'posts-home.hbs',
      author: 'posts-author.hbs'
    }
  },
  loadTemplate: function load(url) {
    if (this.cache[url]) { return this.cache[url]; }

    return new Promise((resolve, reject) => {
      $.get(url, (contents) => {
        this.cache[url] = Promise.resolve(Handlebars.compile(contents));
        resolve(this.cache[url]);
      });
    });
  },
};