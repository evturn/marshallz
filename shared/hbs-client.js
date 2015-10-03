'use strict';

let Handlebars = require('handlebars'),
    helpers = require('./handlebars-helpers')();

module.exports = function() {

  for (let helper in helpers) {
    Handlebars.registerHelper(helper, helpers[helper]);
  }

};