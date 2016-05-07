import { Observable } from 'rx'
import SentenceGenerator from 'sentence-generator'
import bots from './index'
import BlogPost from '../models/blogPost'
import request from 'request'
import { CronJob as Cron } from 'cron'

const createBlogPost = bot => {
  const bot$ = Observable.from([bot])
  const author$ = bot$.map(x => x.authorData())
  const args$ = bot$.map(x => ({ file: x.content, count: 10 }))
  const title$ = args$.map(pullContent).share()
  const slug$ = title$.map(toSlug)
  const query$ = title$.map(encodeURL)

  const gif$ = Observable.combineLatest(bot$, query$)
    .map(getGiphyURL)
    .flatMap(makeNetworkRequest)
    .map(filterImageSrc)

  const body$ = args$
    .map(enablePuncation)
    .flatMap(generatePostBody)
    .reduce(reduceGeneratedStrings, '')

  Observable.combineLatest(title$, slug$, body$, author$, gif$)
    .flatMap(saveNewPost)
    .subscribe(
      x => console.log(`\n\n\n${x}\n\n\n${x.author.username} posted.`),
      e => console.log('Errors, they happen.', e)
    )
}

function pullContent(x) {
  return SentenceGenerator(x)()
}

function enablePuncation(x) {
  x.punctuation = true
  return x
}

function toSlug(x) {
  return x.trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase()
}

function generatePostBody(x) {
  return Observable.generate(
    0,
    i => i < 6,
    i => i + 1,
    _ => pullContent(x)
  )
}

function reduceGeneratedStrings(acc, x) {
  return `${acc + x} `
}

function encodeURL(x) {
  return x.split(' ').join('+')
}

function selectRandomItem(x) {
  return x[Math.floor(Math.random() * x.length)]
}

function getGiphyURL(x) {
  const [ { keys }, query ] = x
  return `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${keys.giphy}`
}

function makeNetworkRequest(x) {
  return Observable.create(observer => {
    request(x, (error, response, body) => {
      const { data } = JSON.parse(body)
      if (data.length) {
        observer.onNext(selectRandomItem(data))
      }
    })
  })
}

function filterImageSrc(x) {
  return x.images.original.url
}

function saveNewPost(x) {
  const [ title, slug, body, author, image ] = x
  const newPost = new BlogPost({ title, slug, body, author, image })
  return Observable.fromPromise(newPost.save())
}

export default createBlogPost(bots[1])

// function scheduleJobs(x) {
//   new Cron(jobs.blog, () => postToBlog(username), null, true)

//   if (jobs.twitter) {
//     new Cron(jobs.twitter, () => postToTwitter(username), null, true)
//   }
// }

// function postStatusToTwitter(payload) {
//   const [ credentials, status ] = payload

//   console.log(status)

//   credentials.post('statuses/update', { status }, (error, tweet, response) => {
//     if (error) {
//       console.log(error)
//     }

//     console.log(JSON.parse(response.body))
//   })

//   return status;
// }

// function postToTwitter(username) {

//   const bot$ = Observable.from(bots);
//     .filter(bot => bot.username === username)

//   const status$ = bot$
//     .map(createTwitterStatus)

//   const credentials$ = bot$
//     .map(x => x.keys.twitter)

//   const payload$ = Observable.combineLatest(
//       credentials$,
//       status$
//     )
//     .map(postStatusToTwitter)
//     .subscribe(
//       x => console.log('\n\n\n', x),
//       e => console.log('we errored', e.message),
//       x => console.log('we complete.')
//     )
// }

// export default bots.forEach(scheduleJobs)