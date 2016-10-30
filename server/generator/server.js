import 'babel-polyfill'
import express from 'express'
import axios from 'axios'
import firebase from 'firebase'
import Generator from './sg'
import { Observable as Ob$ } from 'rxjs'

const app = express()

const contentObserver = {
  next:    gen => {

    console.log(gen.take(4))
  },
  error:    e => console.error(`Jesus fuck!\n${e.message}`),
  complete: _ => console.log(`Bye.`)
}

const api = firebase.initializeApp({
  apiKey: 'AIzaSyBqnVMFW5iidbPpvNL-Vmc5rVf4Cn1Uqq4',
  authDomain: 'marshallz-5ff65.firebaseapp.com',
  databaseURL: 'https://marshallz-5ff65.firebaseio.com/',
  storageBucket: 'gs://marshallz-5ff65.appspot.com',
})


function fetchAuthor(index) {
  return api
    .database()
    .ref()
    .child(`authors/${index}`)
    .once('value')
    .then(x => x.val())
    .then(x => x.source_url)
}

function fetchTextData(url) {
  return axios
    .get(process.env[url])
    .then(x => x.data)
}

function createGenerator(data) {
  const fn = Generator(data)
  const gen = {
    value: '',
    run: _ => fn(),
    take: x => {
      Array
        .from({length: x}, (_, i) => i + 1)
        .map(_ => gen.value += gen.run() + '. ')
      return gen.value.trim()
    }
  }
  return gen
}


function main(x) {
  return Ob$
    .fromPromise(fetchAuthor(x))
    .mergeMap(fetchTextData)
    .map(createGenerator)
    .subscribe(contentObserver)
}

main(0)

app.listen(3000, _ => console.log(`We hear you and we're listening.`))