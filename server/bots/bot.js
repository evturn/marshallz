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
  write() {
    return new Promise((resolve, reject) => {
      new Statement({files: this.filepath})
        .start(capitalize)
        .end()
        .runProcess((err, text) => {
          if (err) { console.log(err); }

          resolve(text);
        });
    });
  }
  dispatch() {
    let jobs = {};

    jobs.twitter = new Cron(this.jobs.twitter, () => this.postToTwitter(), null, true);
    jobs.blog = new Cron(this.jobs.blog, () => this.postToBlog(), null, true);

    return jobs;
  }
  postToBlog() {
    let post = {};
    let string = '';

    this.write()
      .then(text => post.title = text)
      .then(() => {
        this.giphyApi()
          .then(image => post.image = image)
          .then(() => this.write()
            .then(text => string += text + '. '))
              .then(() => this.write()
                .then(text => string += text + '. '))
                  .then(() => this.write()
                    .then(text => string += text + '.'))
                    .then(() => {
                      post.body = string;
                      post.slug = slugify(post.title);
                      post.bot = this.public();
                      post.timestamp = Date.now();

                      return post;
                    })
                    .then(post => {
                      const blogPost = new BlogPost(post);

                      blogPost.save((err, post) => {
                        if (err) { console.log(err); }

                        console.log(post);
                        return post;
                      })
                    })
        }).catch(err => console.log(err));
  }
  postToTwitter() {
    this.write().then(text => {
      if (text.length > 140) {
        return this.postToTwitter();
      }

      this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
        if (error) { return error; }
        console.log(JSON.parse(response.body));
        console.log('=====================================');
        return tweet;
      });
    })
    .catch(err => console.log(err));
  }
  giphyApi() {
    const params = `q=${random(this.keywords)}&api_key=${this.keys.giphy}`;
    const url = `http://api.giphy.com/v1/gifs/search?${params}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const parsed = JSON.parse(body);
          if (parsed.data.length) {
            const item = random(parsed.data);

            resolve(item.images.original.url);
          }
        }
      });
    });
  }
}

module.exports = Bot;
