import axios from 'axios';
import express from 'express';
import firebase from 'firebase';
import createGenerator from './instance';
import createPost from './blog';
import config from './env.json';
import cron from 'cron'

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

const getContent = url => {
  return axios
    .get(url)
    .then(x => x.data)
};

const loadJob = ({ contentURL, cron, ...author }) => {
  /* cron library isn't allowing CronJob constructor call */
  // return new cron.CronJob(cron, addJob(author, contentURL), null, true);
};

const addJob = (author, contentURL) => async () => {
  const gen = await getContent(contentURL).then(createGenerator);
  const post = await createPost({ author, gen });
  console.log('we just made', post);
  return await savePost(post);
};

Promise.all(config.map(loadJob))
  .then(x => console.log('cool', x))
  .catch(e => console.log('uncool', e));

app.listen(3000, () => console.log('we up. we running.'));
