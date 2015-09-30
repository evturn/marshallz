'use strict';

let _ = require('underscore');

module.exports = function() {

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

  function getQueryParams(url) {
    if (!url) {
      return false;
    }
    var query = url.split('?')[1];
    return _.chain(query.split('&'))
      .map(function(params) {
        var p = params.split('=');
        return [p[0], decodeURIComponent(p[1])];
      })
      .object()
      .value();
  };

}();