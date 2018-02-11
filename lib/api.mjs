import axios from 'axios';
import firebase from 'firebase';
import createGenerator from './instance';
import createPost from './blog';
import config from './env.json';
import cron from 'cron';

const api = firebase.initializeApp({
  apiKey:        'AIzaSyBqnVMFW5iidbPpvNL-Vmc5rVf4Cn1Uqq4',
  authDomain:    'marshallz-5ff65.firebaseapp.com',
  databaseURL:   'https://marshallz-5ff65.firebaseio.com/',
  storageBucket: 'gs://marshallz-5ff65.appspot.com',
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

const loadJob = ({ contentURL, crontab, ...author }) => {
  return new cron.CronJob(crontab, addJob(author, contentURL), null, true);
};

const addJob = (author, contentURL) => async () => {
  const gen = await getContent(contentURL).then(createGenerator);
  const post = await createPost({ author, gen });
  console.log('we just made', post);
  return await savePost(post);
};

const runJobs = () => config.map(loadJob);

export default runJobs;
