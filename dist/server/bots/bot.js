'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Bot;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sentenceGenerator = require('./sentence-generator');

var _sentenceGenerator2 = _interopRequireDefault(_sentenceGenerator);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cron = require('cron');

var _utils = require('./utils');

var _blogPost = require('../models/blogPost');

var _blogPost2 = _interopRequireDefault(_blogPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function Bot(props) {
  for (var prop in props) {
    this[prop] = props[prop];
  }

  this.init();
}

Bot.prototype.init = function () {
  var _this = this;

  this.jobs.forEach(function (job) {
    switch (job.type) {
      case 'blog':
        {
          new _cron.CronJob(job.crontab, function () {
            return _this.generateBlogPost();
          }, null, true);
          break;
        }
      case 'twitter':
        {
          new _cron.CronJob(job.crontab, function () {
            return _this.generateTweet();
          }, null, true);
          break;
        }
    }
  });
};

Bot.prototype.props = function () {
  return {
    name: this.name,
    username: this.username,
    index: this.index,
    avatar: this.avatar,
    social: this.social,
    share: this.share
  };
};

Bot.prototype.createSentence = function (characters) {
  return new _sentenceGenerator2.default({
    files: this.content,
    wordCount: characters
  }).init();
};

Bot.prototype.createImage = function () {
  var _this2 = this;

  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(_this2.keywords, 'utf8', function (err, data) {
      var query = (0, _utils.random)(data.split(/(?:\. |\n)/ig));
      var url = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=' + _this2.keys.giphy;

      (0, _request2.default)(url, function (error, response, body) {
        if (error) {
          _this2.showError(error);
        } else if (!error && response.statusCode === 200) {
          var parsed = JSON.parse(body);
          if (parsed.data.length) {
            var item = (0, _utils.random)(parsed.data);

            resolve(item.images.original.url);
          }
        }
      });
    });
  });
};

Bot.prototype.generateBlogPost = function () {
  var _this3 = this;

  var sentences = [];
  var count = 0;

  while (count < 7) {
    var task = count === 0 ? this.createImage() : this.createSentence(10);

    sentences.push(task);
    count += 1;
  }

  Promise.all(sentences).then(function (value) {
    var _value = _toArray(value);

    var image = _value[0];
    var title = _value[1];

    var body = _value.slice(2);

    _this3.saveBlogPost({
      slug: (0, _utils.slugify)(title),
      title: title,
      body: body.join('. '),
      author: _this3.props(),
      image: image
    });
  }).catch(function (err) {
    return _this3.showError(err);
  });
};

Bot.prototype.saveBlogPost = function (post) {
  var _this4 = this;

  var blogPost = new _blogPost2.default(post);

  blogPost.save(function (err, post) {
    if (err) {
      _this4.showError(err);
    }

    _this4.showSuccess(post);
  });
};

Bot.prototype.generateTweet = function () {
  var _this5 = this;

  this.createSentence(16).then(function (text) {
    console.log(_this5.keys.twitter);
    _this5.keys.twitter.post('statuses/update', { status: text }, function (error, tweet, response) {
      if (error) {
        _this5.showError(error);
      }

      _this5.showSuccess(JSON.parse(response.body));
    });
  });
};

Bot.prototype.showError = function (err) {
  console.log('======' + this.name + ' error======');
  console.log(err);
  console.log('======' + this.name + ' error======');
};

Bot.prototype.showSuccess = function (res) {
  console.log('======' + this.name + ' success=====');
  console.log(res);
  console.log('======' + this.name + ' success=====');
};