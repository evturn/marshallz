import fs from 'fs';
import SentenceGenerator from 'sentence-generator';
import request from 'request';
import { CronJob as Cron } from 'cron';
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
  let options = {
    file: this.content,
    count: 10
  };
  const createTitle = SentenceGenerator(options);
  const title = createTitle();

  options.punctuation = true;

  const createSentence = SentenceGenerator(options);
  let sentences = createSentence();
  let i = 0;

  while (i < 6) {
    sentences += ' ' + createSentence();
    i += 1;
  }

  this.createImage()
    .then(image => {

      this.saveBlogPost({
        slug: slugify(title),
        title: title,
        body: sentences,
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
  const createTweet = SentenceGenerator({
    file: this.content,
    count: 16
  });
  const status = { status: createTweet() };
  const callback = (error, tweet, response) => {
    if (error) {
      this.showError(error);
    }

    this.showSuccess(JSON.parse(response.body));
  };

  this.keys.twitter.post('statuses/update', status, callback);
};

Bot.prototype.showError = function(err) {
  console.log(`\n\n\n======${this.name} error======`);
  console.log(err);
  console.log(`======${this.name} error======`);
};

Bot.prototype.showSuccess = function(res) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log(`\n\n\n======${this.name} success=====`);
  console.log(res);
  console.log(`======${this.name} success=====`);
};

function slugify(value) {
  value = value || '';

  return value.trim().replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-').replace(/^-+|-+$/g,'').toLowerCase();
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}