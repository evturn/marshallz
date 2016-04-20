import { Observable } from 'rx';
import SentenceGenerator from 'sentence-generator';
import bots from './index';
import BlogPost from '../models/blogPost';

const createTitle = bot => {
  return SentenceGenerator({
    file: bot.content,
    count: 10
  })()
}

const createSentence = bot => {
  return SentenceGenerator({
    file: bot.content,
    count: 10,
    punctuation: true
  })()
}

const createSlug = title => {
  return title
    .trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase();
}

const getAuthorData = bot => {
  const props = bot.authorData()

  return { ...props }
}

const savePost = data => {
  const [ title, slug, body, author ] = data
  const post = new BlogPost({ title, slug, body, author })

  return Observable.fromNodeCallback(post.save())
}

const bots$ = Observable.from(bots);

function postToBlog(username) {

  const bot$ = bots$
    .filter(bot => bot.username === username);

  const author$ = bot$
    .map(getAuthorData)

  const title$ = bot$
    .map(createTitle)
    .share()

  const slug$ = title$
    .map(createSlug)

  const body$ = bot$
    .map(createSentence)
    .repeat(6)
    .reduce((acc, item) => acc + item + ' ', '')
    .map(x => x.trim())

  const post$ = Observable.combineLatest(
      title$,
      slug$,
      body$,
      author$
    )
    .map(savePost)
    .subscribe(
      x => console.log('\n\n\n', x),
      e => console.log('we errored', e.message),
      x => console.log('we complete.')
    )
}

postToBlog('marshall')

// function createImage() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(this.keywords, 'utf8', (err, data) => {
//       const query = random(data.split(/(?:\. |\n)/ig));
//       const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${this.keys.giphy}`;

//       request(url, (error, response, body) => {
//         if (error) {
//           this.showError(error);
//         } else if (!error && response.statusCode === 200) {
//           const parsed = JSON.parse(body);

//           if (parsed.data.length) {
//             const item = random(parsed.data);

//             resolve(item.images.original.url);
//           }
//         }
//       });
//     });
//   });
// }

// function random(array) {
//   return array[Math.floor(Math.random() * array.length)];
// }

// function showError(err) {
//   console.log(`\n\n\n======${this.name} error======`);
//   console.log(err);
//   console.log(`\n\n\n======${this.name} error======`);
// }

export default bots$;