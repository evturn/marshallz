'use strict';
const fs = require('fs');
const Statement = require('./statement');
const request = require('request');
const Cron = require('cron').CronJob;
const utils = require('./utils');
const random = utils.random;
const capitalize = utils.capitalize;
const slugify = utils.slugify;
const BlogPost = require('../models/blogPost');

function mergeProps(props) {
  for (let prop in props) {
    this[prop] = props[prop];
  }
};

class Bot {
  constructor(props) {
    mergeProps.call(this, props);

    this.postToBlog = this.postToBlog;
    this.props = this.props;
    this.content = new Statement({files: this.filepath}).start(capitalize).end();

    this.init();
  }
  props() {
    return {
      name: this.name,
      username: this.username,
      index: this.index,
      avatar: this.avatar,
      social: this.social
    };
  }
  init() {
    if (this.social) {
      this.postToTwitter = this.postToTwitter;
      new Cron(this.jobs.twitter, () => this.generateTweet(), null, true);
    }

    new Cron(this.jobs.blog, () => this.generateBlogPost(), null, true);
  }

  saveBlogPost(post) {
    const blogPost = new BlogPost(post);

      blogPost.save((err, post) => {
        if (err) {
          this.showError(err);
        }

        this.showSuccess(post);
      })
  }
  generateTweet() {
    this.tweetRunner();
  }
  generateBlogPost() {
    let count = 0;
    let sentences = [];

    while (count < 5) {
      if (count !== 4) {
        sentences.push(this.createSentence());
      } else {
        sentences.push(this.getImageUrl());
      }

      count += 1;
    }

    Promise.all(sentences)
      .then(v => {
        let [title, ...body] = v;

        console.log(body);
      })

  }
  createSentence() {
    return new Promise((resolve, reject) => {
      this.content.runProcess((err, data) => {
        if (err) {
          reject(this.showError(err));
        } else {
          resolve(data);
        }
      });
    });
  }
  getImageUrl() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.keywords, 'utf8', (err, data) => {
        const query = random(data.split(/(?:\. |\n)/ig));
        const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${this.keys.giphy}`;

        request(url, (error, response, body) => {
          if (error) {
            this.showError(error);
          } else if (!error && response.statusCode === 200) {
            const parsed = JSON.parse(body);
            if (parsed.data.length) {
              const item = random(parsed.data);

              resolve(item.images.original.url);
            }
          }
        });
      });
    });
  }
  tweetRunner() {
    const write = () => {
      this.content.runProcess(function(err, text) {
        if (err) {
          it.throw(err);
        } else if (text.length > 140) {
          write();
        } else {
          it.next(text);
        }
      });
    };

    const twitter = (text) => {
      this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
        if (error) {
          this.showError(error);
        }

        this.showSuccess(JSON.parse(response.body));
      });
    }

    function *tweetGenerator() {
      try {
        const text = yield write();
        twitter(text);
      } catch (err) {
        console.error(err);
      }
    }

    const it = tweetGenerator();
    it.next();
  }
  showError(err) {
    console.log(`======${this.name} error======`);
    console.log(err);
    console.log(`======${this.name} error======`);
  }
  showSuccess(res) {
    console.log(`======${this.name} success=====`);
    console.log(res);
    console.log(`======${this.name} success=====`);
  }
}

module.exports = Bot;
