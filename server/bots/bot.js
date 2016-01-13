'use strict';
const Statement = require('./statement');
const utils = require('./utils');
const capitalize = utils.capitalize;

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
      console.log(this.filepath);
      new Statement({files: this.filepath})
        .start(capitalize)
        .end()
        .runProcess((err, text) => {
          if (err) { console.log(err); }
          console.log(text);
          resolve(text);
        });
    });
  }
  postToTwitter() {
    this.write().then((text) => {
      console.log(text);
      if (text.length > 140) {
        return this.postToTwitter();
      }

      this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
        if (error) { return error; }

        console.log(JSON.parse(response.body));
        return tweet;
      });
    })
    .catch((err) => console.log('text', err));
  }
}

module.exports = Bot;