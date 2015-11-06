'use strict';

module.exports.slugify = (value) => {

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

  return toSlug(value);
};

module.exports.select = (obj) => {
  let keys = Object.keys(obj);
  let sum = keys.reduce((p, c) => p + obj[c], 0);

  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value');
  }

  let select = ~~(Math.random() * sum);

  for (let i = 0, count = 0; i < keys.length; i++) {
    count += obj[keys[i]];
    if (count > select) {
      return keys[i];
    }
  }
};

module.exports.confirmType = (t) => {
  return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
};