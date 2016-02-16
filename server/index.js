require('babel-core/register')({
  only: /server/,
  ignore: function(filename) {
    const allowed = filename === '../public/assets/app.server.js' ? false : true;

    return allowed;
  }
});
require('./routes/config');