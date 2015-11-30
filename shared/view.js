const Handlebars = require('./web_modules/handlebars');
const helpers = require('./hbs-helpers');

exports.helpers = () => {
  for (let fn in helpers) {
    Handlebars.registerHelper(fn, helpers[fn]);
  }
  return Handlebars;
};

exports.templates = {
  posts: {
    index: 'posts-home.hbs',
    author: 'posts-author.hbs'
  }
};