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
    .once('value')
    .then(x => x.val())
    .then(x => {
      const posts = Object.keys(x.posts).reduce(convertMapToList(x.posts), [])
      return { posts, authors: x.authors }
    })
}

function convertMapToList(data) {
  return (acc, x) => acc.concat(data[x])
}

export { fetchInitialData }