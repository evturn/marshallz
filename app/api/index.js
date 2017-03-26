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
    .then(authors => ({type: 'AUTHORS_FETCHED', authors}))
}

function fetchByAuthor(username) {
  const posts = fetchPostsByAuthor(username)
  const author = fetchAuthor(username)
  return Promise.all([posts, author])
    .then(([posts, author]) => ({ posts, author }))
    .then(x => ({type: 'FETCH_SUCCESS', ...x}))
}

function fetchAuthor(username) {
  return api
    .database()
    .ref()
    .child('authors')
    .once('value')
    .then(x => x.val())
    .then(x => x.filter(x => x.username === username)[0])
}

function fetchPostsByAuthor(username) {
  return api
    .database()
    .ref()
    .child('posts')
    .orderByChild('author/username')
    .equalTo(username)
    .once('value')
    .then(x => x.val())
    .then(reduceToArray)
}

function fetchByDate() {
  return api
    .database()
    .ref()
    .child('posts')
    .limitToLast(5)
    .once('value')
    .then(x => x.val())
    .then(reduceToArray)
    .then(posts => ({type: 'FETCH_SUCCESS', posts}))
}

function reduceToArray(data) {
  return Object
    .keys(data)
    .reduce((acc, x) => acc.concat(data[x]), [])
    .reverse()
}

export { fetchInitialData, fetchByAuthor, fetchByDate }