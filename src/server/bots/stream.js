import { Observable } from 'rx'
import SentenceGenerator from 'sentence-generator'
import bots from './index'
import BlogPost from '../models/blogPost'
import request from 'request'
import { CronJob as Cron } from 'cron'

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

const createTwitterStatus = bot => {
  return SentenceGenerator({
    file: bot.content,
    count: 16
  })()
}

const createSlug = title => {
  return title
    .trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase()
}

const selectRandomItem = arr => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const getAuthorData = bot => {
  const props = bot.authorData()

  return { ...props }
}

const savePost = data => {
  const [ title, slug, body, author, image ] = data
  const post = new BlogPost({ title, slug, body, author, image })

  return Observable.fromNodeCallback(post.save())
}

const scheduleJobs = bot => {
  const { jobs, username } = bot

  new Cron(jobs.blog, () => postToBlog(username), null, true)

  if (jobs.twitter) {
    new Cron(jobs.twitter, () => postToTwitter(username), null, true)
  }
}

const fetchImageFromApi = payload => {
  const [ bot, title ] = payload
  const query = title.split(' ').join('+')
  const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${bot.keys.giphy}`

  return Observable.create(x => {
    request(url, (error, response, body) => {
      if (error) {
        x.onError(error)
      } else if (!error && response.statusCode === 200) {
        const { data } = JSON.parse(body)

        if (data.length) {
          const { images: { original: { url }}} = selectRandomItem(data)

          x.onNext(url)
        }
      }

      x.onCompleted()
    })
  })
}

const postStatusToTwitter = payload => {
  const [ credentials, status ] = payload

  console.log(status)

  credentials.post('statuses/update', { status }, (error, tweet, response) => {
    if (error) {
      console.log(error)
    }

    console.log(JSON.parse(response.body))
  })

  return status;
}

const bots$ = Observable.from(bots);

function postToTwitter(username) {

  const bot$ = bots$
    .filter(bot => bot.username === username)

  const status$ = bot$
    .map(createTwitterStatus)

  const credentials$ = bot$
    .map(x => x.keys.twitter)

  const payload$ = Observable.combineLatest(
      credentials$,
      status$
    )
    .map(postStatusToTwitter)
    .subscribe(
      x => console.log('\n\n\n', x),
      e => console.log('we errored', e.message),
      x => console.log('we complete.')
    )
}

function postToBlog(username) {

  const bot$ = bots$
    .filter(bot => bot.username === username)

  const title$ = bot$
    .map(createTitle)
    .share()

  const slug$ = title$
    .map(createSlug)

  const image$ = Observable.combineLatest(
      bot$,
      title$
    )
    .flatMap(fetchImageFromApi)

  const body$ = bot$
    .map(createSentence)
    .repeat(6)
    .reduce((acc, item) => acc + item + ' ', '')
    .map(x => x.trim())

  const author$ = bot$
    .map(getAuthorData)

  const post$ = Observable.combineLatest(
      title$,
      slug$,
      body$,
      author$,
      image$
    )
    .map(savePost)
    .subscribe(
      x => console.log('\n\n\n', x),
      e => console.log('we errored', e.message),
      x => console.log('we complete.')
    )
}

export default bots.forEach(scheduleJobs)