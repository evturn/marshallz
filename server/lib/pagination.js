'use strict';
const _ = require('underscore');
const app = require('../config');
const loadPolicy = app.get('loadPolicy');
const loadLimit = app.get('loadLimit');

const proto = {
  start: null,
  end: null,
  totalCount: loadLimit,
  limit: loadPolicy,
  page: null,
  pages: null,
  inate: function inate(page) {
    if (!page) {
      throw new Error('Current page parameter required');
    }

    this.page = parseInt(page);
    this.start = this.limit * this.page;
    this.end = this.start + this.limit;
    this.pages = Math.ceil(this.totalCount / this.limit);
    return this;
  }
};

exports = module.exports = function createState() {
  const state = {};

  return _.extend(state, proto);
};
