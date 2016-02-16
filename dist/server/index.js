'use strict';

require('babel-core/register')({
  only: /server/,
  ignore: function ignore(filename) {
    var allowed = filename === '../../public/assets/app.server.js' ? false : true;

    return allowed;
  }
});
require('./config');