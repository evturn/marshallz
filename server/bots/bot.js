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
    this.public = this.public;
    this.content = new Statement({files: this.filepath}).start(capitalize).end();

    this.init();
  }
  public() {
    return {
      name: this.name,
      username: this.username,
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
  generateTweet() {
    this.tweetRunner();
  }
  generateBlogPost() {
    this.blogPostRunner(post => {
      const blogPost = new BlogPost(post);

      blogPost.save((err, post) => {
        if (err) { console.log(err); }
        console.log(`===Post created by ${this.name}======`);
        console.log(post);
        console.log(`===Post created by ${this.name}======`);
        return post;
      })
    });
  }
  blogPostRunner(cb) {
    const bot = this.public();

    function *blogPostGenerator() {
      const post = {};
      let text;
      try {
        text = yield write();
        text += text = yield write();
        text += text = yield write();
        post.image = yield giphy();
        post.title = yield write(false);
        post.slug = slugify(post.title);
        post.body = text
        post.bot = bot;
        post.timestamp = Date.now()

        cb(post);
      } catch (err) {
        console.error(err);
      }
    }

    const write = (punc) => {
      const period = punc !== false ? '. ' : '';

      this.content.runProcess(function(err, data) {
        if (err) {
          it.throw(err);
        } else {
          it.next(data + period);
        }
      });
    };

    const giphy = () => {
      fs.readFile(this.keywords, 'utf8', (err, data) => {
        const query = random(data.split(/(?:\. |\n)/ig));
        const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${this.keys.giphy}`;

        request(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const parsed = JSON.parse(body);
            if (parsed.data.length) {
              const item = random(parsed.data);

              it.next(item.images.original.url);
            }
          }
        });
      });
    };

    const it = blogPostGenerator();
    it.next();
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
          console.log(error);
        }

        console.log(JSON.parse(response.body));
        console.log(`===Tweet created by ${this.name}======`);

        return tweet;
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
}

module.exports = Bot;
