'use strict';
const _ = require('underscore');

module.exports = () => {

  const escapeForRegExp = (value) => {
    if (_.isUndefined(value)) {
      return '';
    }
    return value.toString().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  };

  const trim = (value, chars) => {
    chars = escapeForRegExp(chars);
    return value.replace(new RegExp('^(' + chars + ')+|(' + chars + ')+$', 'g'), '').toLowerCase();
  };

  const toSlug = (value) => {
    value = value || '';
    return value.trim().replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-').replace(/^-+|-+$/g,'').toLowerCase();
  };

  const getQueryParams = (url) => {
    if (!url) {
      return false;
    }
    let query = url.split('?')[1];
    return _.chain(query.split('&'))
      .map((params) => {
        let p = params.split('=');
        return [p[0], decodeURIComponent(p[1])];
      })
      .object()
      .value();
  };

}();