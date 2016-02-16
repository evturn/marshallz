const fs = require('fs');
const Statement = require('./statement');
const request = require('request');
const Cron = require('cron').CronJob;
const utils = require('./utils');
const random = utils.random;
const capitalize = utils.capitalize;
const slugify = utils.slugify;
const BlogPost = require('../models/blogPost');

function Bot(props) {
  for (let prop in props) {
    this[prop] = props[prop];
  }

  this.init();
}

Bot.prototype.init = function() {
  this.jobs.forEach(job => {
    switch (job.type) {
      case 'blog': {
        new Cron(job.crontab, () => this.generateBlogPost(), null, true);
        break;
      }
      case 'twitter': {
        new Cron(job.crontab, () => this.generateTweet(), null, true);
        break;
      }
    }
  });
};

Bot.prototype.props = function() {
  return {
    name: this.name,
    username: this.username,
    index: this.index,
    avatar: this.avatar,
    social: this.social
  };
};

Bot.prototype.createSentence = function() {
  const content = new Statement({ files: this.content }).start(capitalize).end()

  return new Promise((resolve, reject) => {
    content.runProcess((err, data) => {
      if (err) {
        reject(this.showError(err));
      } else {
        resolve(data);
      }
    });
  });
};

Bot.prototype.createImage = function() {
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
};

Bot.prototype.generateBlogPost = function() {
  let sentences = [];
  let count = 0;

  while (count < 5) {
    const task = count === 0 ? this.createImage() : this.createSentence();

    sentences.push(task);
    count += 1;
  }

  Promise.all(sentences)
    .then(value => {
      const [image, title, ...body] = value;

      this.saveBlogPost({
        slug: slugify(title),
        title: title,
        body: body.join('. '),
        author: this.props(),
        image: image
      });
    })
    .catch(err => this.showError(err));
};

Bot.prototype.saveBlogPost = function(post) {
  const blogPost = new BlogPost(post);

    blogPost.save((err, post) => {
      if (err) {
        this.showError(err);
      }

      this.showSuccess(post);
    })
};

Bot.prototype.generateTweet = function() {
  this.createSentence().then(text => {
    console.log(this.keys.twitter);
    this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
      if (error) {
        this.showError(error);
      }

      this.showSuccess(JSON.parse(response.body));
    });
  });
};

Bot.prototype.showError = function(err) {
  console.log(`======${this.name} error======`);
  console.log(err);
  console.log(`======${this.name} error======`);
};

Bot.prototype.showSuccess = function(res) {
  console.log(`======${this.name} success=====`);
  console.log(res);
  console.log(`======${this.name} success=====`);
};

module.exports = Bot;