'use strict';
const Statement = require('./statement');
const request = require('request');
const utils = require('./utils');
const random = utils.random;
const capitalize = utils.capitalize;
const slugify = utils.slugify;

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
    this.public = this.public;
    this._id = props._id;
  }
  public() {
    return {
      name: this.name,
      username: this.username,
      avatar: this.avatar,
      social: this.social,
      _id: this._id
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
  postToBlog() {
    const BODY_LENGTH = 3;
    let i = 0;
    let post = {};
    let body = '';
    
    this.write()
      .then(text => post.title = text)
      .then(() => {
        this.giphyApi()
          .then(image => post.image = image)    
      })
      .then(() => {
        while (i < BODY_LENGTH) {
          this.write()
            .then(text => {
              body += text.endsWith('?') ? `${text} ` : `${text}. `;
              ITERATION += 1;
            });
        }
      })
      .catch(err => console.log(err);
    
    post.slug = slugify(post.title);
    post.body = body;
    post.bot = this.public();
    post.timestamp = Date.now();
    
    return post;
  }
  postToTwitter() {
    this.write().then(text => {
      if (text.length > 140) {
        return this.postToTwitter();
      }

      this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
        if (error) { return error; }
        
        return tweet;
      });
    })
    .catch(err => console.log(err);
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
            
            resolve({image: item.images.original.url});
          }
        }
      });
    });
  }
}

module.exports = Bot;
