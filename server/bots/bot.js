'use strict';
const Statement = require('./statement');
const request = require('request');
const Cron = require('cron').CronJob;
const utils = require('./utils');
const random = utils.random;
const capitalize = utils.capitalize;
const slugify = utils.slugify;
const BlogPost = require('../models/blogPost');

class Bot {
  constructor(props) {
    this.name = props.name;
    this.username = props.username;
    this.avatar = props.avatar;
    this.filepath = props.filepath;
    this.keys = props.keys;
    this.social = props.social;
    this.jobs = props.jobs;
    this.keywords = props.keywords;
    this.post = props.post;
    this.postToTwitter = this.postToTwitter;
    this.postToBlog = this.postToBlog;
    this.dispatch = this.dispatch;
    this.public = this.public;
    this.content = new Statement({files: this.filepath}).start(capitalize).end();
    this.dispatch();
  }
  public() {
    return {
      name: this.name,
      username: this.username,
      avatar: this.avatar,
      social: this.social
    };
  }
  runner(cb) {
    const bot = this.public();

    function *gen() {
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
      const url = `http://api.giphy.com/v1/gifs/search?q=${random(this.keywords)}&api_key=${this.keys.giphy}`;

      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const parsed = JSON.parse(body);
          if (parsed.data.length) {
            const item = random(parsed.data);

            it.next(item.images.original.url);
          }
        }
      });
    };

    const it = gen();
    it.next();
  }
  generatePost() {
    this.runner(post => {
      const blogPost = new BlogPost(post);

      blogPost.save((err, post) => {
        if (err) { console.log(err); }
        console.log('=======NEW POST======');
        console.log(post);
        console.log('=======NEW POST======');
        return post;
      })
    });
  }
  dispatch() {
    let jobs = {};

    jobs.twitter = new Cron(this.jobs.twitter, () => this.postToTwitter(), null, true);
    jobs.blog = new Cron(this.jobs.blog, () => this.generatePost(), null, true);

    return jobs;
  }
  postToTwitter() {
    this.write().then(text => {
      if (text.length > 140) {
        return this.postToTwitter();
      }

      this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
        if (error) { return error; }
        console.log(JSON.parse(response.body));
        return tweet;
      });
    })
    .catch(err => console.log(err));
  }
}

module.exports = Bot;
