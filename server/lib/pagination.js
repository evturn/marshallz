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
  message: `That's all for today.`,
  inate: function inate(page) {
    if (!page) {
      throw new Error('Current page parameter required');
    }

    this.page = parseInt(page);
    this.start = this.limit * this.page;
    this.end = this.start + this.limit;
    this.pages = Math.ceil(this.totalCount / this.limit);
    return this;
  },
  hasEnded: function hasEnded(obj) {
    if (this.page === this.pages) {
      obj.message = this.message;
    }
    return obj;
  },
};

exports = module.exports = function createState() {
  const state = {};

  return _.extend(state, proto);
};
