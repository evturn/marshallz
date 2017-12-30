import axios from 'axios';
import express from 'express';
import firebase from 'firebase';
import createGenerator from './instance';
import createPost from './blog';

const app = express();

const api = firebase.initializeApp({
  apiKey:          'AIzaSyBqnVMFW5iidbPpvNL-Vmc5rVf4Cn1Uqq4',
  authDomain:      'marshallz-5ff65.firebaseapp.com',
  databaseURL:     'https://marshallz-5ff65.firebaseio.com/',
  storageBucket:   'gs://marshallz-5ff65.appspot.com',
});

const savePost = async post => {
  return await api
    .database()
    .ref()
    .child('posts')
    .push(post);
};

const fetchConfigs = async () => {
  return await api
    .database()
    .ref()
    .child(`cronjobs`)
    .once('value')
    .then(x => x.val())
};

const fetchAuthor = ({ index }) => {
  return api
    .database()
    .ref()
    .child(`authors/${index}`)
    .once('value')
    .then(x => x.val());
};

const fetchContent = ({ source }) => {
  return axios
    .get(process.env[source])
    .then(x => x.data)
    .then(createGenerator);
};

const main = async () => {
  const [config] = await fetchConfigs();
  const author   = await fetchAuthor(config);
  const gen      = await fetchContent(config);
  const post     = await createPost({ author, gen });
  console.log(post);
  return await savePost(post);
};

main()
  .then(() => console.log('Done.'))
  .catch(e => console.log('Fuck.', e));

app.listen(3000, () => console.log('we up. we running.'));
