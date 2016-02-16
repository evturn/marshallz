import fs from 'fs';
import SentenceGenerator from './sentence-generator';
import request from 'request';
import { CronJob as Cron } from 'cron';
import { random, capitalize, slugify } from './utils';
import BlogPost from '../models/blogPost';

export default function Bot(props) {
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
    social: this.social,
    share: this.share
  };
};

Bot.prototype.createSentence = function(characters) {
  return new SentenceGenerator({
    files: this.content,
    wordCount: characters
  }).init();
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

  while (count < 7) {
    const task = count === 0 ? this.createImage() : this.createSentence(10);

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
  this.createSentence(16).then(text => {
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