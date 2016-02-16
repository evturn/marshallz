import path from 'path';

export const normalize = (word) => {
  if (word === undefined) {
    return '';
  }

  return word.replace(/\.$/ig, '');
};

export const injectNewlines = (file) => {
  return file.split(/(?:\. |\n)/ig);
};

export const random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const capitalize = (wordList) => {
  let tmpList = Object.keys(wordList).filter((word) => {
    return word[0] >= 'A' && word[0] <= 'Z';
  });

  return tmpList[~~(Math.random() * tmpList.length)];
};

export const ofType = (file) => {
  return file.indexOf('.' + path.sep) === 0 || file.indexOf(path.sep) === 0;
};

export const select = (obj) => {
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

export const confirmType = (file) => {
  return Object.prototype.toString.call(file).slice(8, -1).toLowerCase();
};

export const slugify = (value) => {

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