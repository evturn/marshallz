import axios from 'axios'
import firebase from 'firebase'
import createGenerator from './instance'
import writeBlogPost from './blog'
import writeTwitterPost from './twitter'
import { CronJob as Cron } from 'cron'
import { Observable as Ob$ } from 'rxjs'

export const api = firebase.initializeApp({
  apiKey: 'AIzaSyBqnVMFW5iidbPpvNL-Vmc5rVf4Cn1Uqq4',
  authDomain: 'marshallz-5ff65.firebaseapp.com',
  databaseURL: 'https://marshallz-5ff65.firebaseio.com/',
  storageBucket: 'gs://marshallz-5ff65.appspot.com',
})

const subscriber = {
  next: x => console.log(x),
  error: e => console.error(`Jesus fuck! ${e}`),
  complete: _ => console.log(`Bye.`)
}

export default function main() {
  return Ob$
    .fromPromise(fetchInitialData())
    .mergeMap(streamAllElements)
    .pluck('cronjobs')
    .mergeMap(streamAllElements)
    .map(createCronjob)
    .subscribe(subscriber)
}

function fetchInitialData() {
  return api
    .database()
    .ref()
    .child(`authors`)
    .once('value')
    .then(x => x.val())
}

function streamAllElements(xs) {
  return Ob$.from(xs)
}

function createCronjob(data) {
  return new Cron(data.cron, cronjobToDispatch(data), null, true)
}

function cronjobToDispatch({ type, index, source }) {
  const jobToRun = type === 'blog' ? writeBlogPost : writeTwitterPost
  return _ => {
    Promise.all([fetchAuthor(index), fetchContent(source)])
      .then(([author, gen]) => ({ author, gen }))
      .then(jobToRun)
  }
}

function fetchAuthor(index) {
  return api
    .database()
    .ref()
    .child(`authors/${index}`)
    .once('value')
    .then(x => x.val())
}

function fetchContent(source) {
  return axios
    .get(process.env[source])
    .then(x => x.data)
    .then(createGenerator)
}

function noop() {
  return
}