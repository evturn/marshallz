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
    .map(combineAllCronjobs)
    .groupBy(groupByJobType)
    // .mergeMap(selectJobsToExec)
    // .mergeMap(x => Ob$
    //   .fromPromise(fetchAuthor(x.index))
    //   .pluck('source_url')
    //   .mergeMap(fetchAuthorContent)
    //   .map(createGenerator)
    //   .map(x.fn)
    // )
    .subscribe(subscriber)
}

function combineAllCronjobs(data) {
  return data.reduce((acc, x) => acc.concat(x.cronjobs), [])
}

function groupByJobType(data) {
  return data.type === 'blog'
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