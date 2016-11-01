import firebase from 'firebase'

export const api = firebase.initializeApp({
  apiKey: 'AIzaSyBqnVMFW5iidbPpvNL-Vmc5rVf4Cn1Uqq4',
  authDomain: 'marshallz-5ff65.firebaseapp.com',
  databaseURL: 'https://marshallz-5ff65.firebaseio.com/',
  storageBucket: 'gs://marshallz-5ff65.appspot.com',
})

function fetchInitialData() {
  return api
    .database()
    .ref()
    .child('authors')
    .once('value')
    .then(x => x.val())
    .then(authors => ({
      type: 'AUTHORS_FETCHED',
      authors
    }))
}

function fetchByAuthor(username) {
  return api
    .database()
    .ref()
    .child('posts')
    .orderByChild('author/username')
    .equalTo(username)
    .once('value')
    .then(x => x.val())
    .then(x => ({
      type: 'FETCH_SUCCESS',
      posts: Object.keys(x).reduce(convertMapToList(x), [])
    }))
}

function fetchByDate() {
  return api
    .database()
    .ref()
    .child('posts')
    .once('value')
    .then(x => x.val())
    .then(x => ({
      type: 'FETCH_SUCCESS',
      posts: Object.keys(x).reduce(convertMapToList(x), [])
    }))
}

function convertMapToList(data) {
  return (acc, x) => acc.concat(data[x])
}

export { fetchInitialData, fetchByAuthor, fetchByDate }