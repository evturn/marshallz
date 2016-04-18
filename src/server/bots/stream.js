import { Observable, Observer } from 'rx';
import SentenceGenerator from 'sentence-generator';
import fs from 'fs';
import bots from './index';
import request from 'request';
import { CronJob as Cron } from 'cron';
import BlogPost from '../models/blogPost';

const createTitle = bot => {
  return SentenceGenerator({
    file: bot.content,
    count: 10
  })();
};

const createSentence = bot => {
  return SentenceGenerator({
    file: bot.content,
    count: 10,
    punctuation: false
  })();
};

const obs$ = Observable.interval(3000);

const bots$ = Observable.from(bots);

const source$ = obs$
  .do(x => console.log('Side effect'));

const published$ = source$
    .flatMap(() => bots$.map(x => createSentence(x)));

published$.subscribe(
  x => console.log('\n\n\n', x),
  e => console.log('we errored', e.message),
  x => console.log('we complete.')
);

function generateBlogPost() {
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
}

function saveBlogPost(post) {
  const blogPost = new BlogPost(post);

    blogPost.save((err, post) => {
      if (err) {
        this.showError(err);
      }

      this.showSuccess(post);
    })
}

function createImage() {
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

function slugify(value) {
  value = value || '';

  return value
    .trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase();
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showError(err) {
  console.log(`\n\n\n======${this.name} error======`);
  console.log(err);
  console.log(`\n\n\n======${this.name} error======`);
}

function showSuccess(res) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log(`\n\n\n======${this.name} success=====`);
  console.log(res);
  console.log(`\n\n\n======${this.name} success=====`);
}

export default obs$;