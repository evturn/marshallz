'use strict';
const clang = require('../bots/clang');
const marshall = require('../bots/marshall');
const _ = require('lodash');

exports.all = function(req, res, next) {
  const c = clang.public();
  const m = marshall.public();

  res.json([m, c]);
};