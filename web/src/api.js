import firebase from 'firebase'

export const api = firebase.initializeApp({
  apiKey: 'AIzaSyBqnVMFW5iidbPpvNL-Vmc5rVf4Cn1Uqq4',
  authDomain: 'marshallz-5ff65.firebaseapp.com',
  databaseURL: 'https://marshallz-5ff65.firebaseio.com/',
  storageBucket: 'gs://marshallz-5ff65.appspot.com',
})

export const fetchInitialData = () => {
  return api
    .database()
    .ref()
    .child('authors')
    .once('value')
    .then(x => x.val())
    .then(authors => fetchByDate().then(posts => ({ authors, posts})))
};

export const fetchByAuthor = username => {
  const posts = fetchPostsByAuthor(username)
  const author = fetchAuthor(username)
  return Promise.all([posts, author])
    .then(([posts, author]) => ({ posts, author }));
};

export const fetchAuthor = username => {
  return api
    .database()
    .ref()
    .child('authors')
    .once('value')
    .then(x => x.val())
    .then(x => x.filter(x => x.username === username)[0])
};

const fetchPostsByAuthor = username => {
  return api
    .database()
    .ref()
    .child('posts')
    .orderByChild('author/username')
    .equalTo(username)
    .once('value')
    .then(x => x.val())
    .then(reduceToArray);
};

export const fetchByDate = () => {
  return api
    .database()
    .ref()
    .child('posts')
    .limitToLast(10)
    .once('value')
    .then(x => x.val())
    .then(reduceToArray);
};

function reduceToArray(data) {
  return Object
    .keys(data)
    .reduce((acc, x) => acc.concat(data[x]), [])
    .reverse()
}