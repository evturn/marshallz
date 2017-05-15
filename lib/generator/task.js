import axios from 'axios';
import { api } from './index.js';
import createGenerator from './instance';

const endpoints = ['authors/0', 'authors/1', 'authors/2'];

const fetchAuthor = endpoint => {
  return api
    .database()
    .ref()
    .child(endpoint)
    .once('value')
    .then(x => x.val());
};

const fetchText = author => {
  return axios
    .get(author.content_url)
    .then(x => x.data);
};

async function getGenerator(endpoint) {
  return await fetchAuthor(endpoint)
    .then(fetchText)
    .then(createGenerator);
}