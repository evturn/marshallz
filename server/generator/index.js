import axios from 'axios'
import firebase from 'firebase'
import createGenerator from './instance'
import { CronJob as Cron } from 'cron'
import { Observable as Ob$ } from 'rxjs'

const api = firebase.initializeApp({
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
    .mergeMap(selectJobsToExec)
    .mergeMap(populateGenerator)
    .subscribe(subscriber)
}

function populateGenerator(x) {
  return Ob$
    .fromPromise(fetchAuthor(x.index))
    .map(filterSourceURL)
    .mergeMap(x => Ob$.fromPromise(fetchAuthorContent(x)))
    .map(createGenerator)
    .map(x.fn)
}

function selectJobsToExec(data) {
  return Ob$
    .from(data.map(filterCronjobs))
    .mergeMap(x => Ob$.from(x))
}

function filterCronjobs(data) {
  const jobs = {blog: writeBlogPost, twitter: writeTwitterPost}
  return data.cronjobs.map(x => ({fn: jobs[x.type], index: x.index}))
}

function filterSourceURL(data) {
  return data.source_url
}

function writeBlogPost(gen) {
  return gen.take(8)
}

function writeTwitterPost(gen) {
  return gen.run()
}

function fetchInitialData() {
  return api
    .database()
    .ref()
    .child(`authors`)
    .once('value')
    .then(x => x.val())
}

function fetchAuthor(index) {
  return api
    .database()
    .ref()
    .child(`authors/${index}`)
    .once('value')
    .then(x => x.val())
}

function fetchAuthorContent(url) {
  return axios
    .get(process.env[url])
    .then(x => x.data)
}