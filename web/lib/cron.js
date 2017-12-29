import express from 'express';
import axios from 'axios';
import { b0rf, clang, marshall } from './env';
import createGenerator from './generator/instance';

const app = express();

async function fetchContent(url) {
  const { data } = await axios.get(url);
  return data;
}

const createTextOutput = data => {
  const genarator = createGenerator(data);
  const charMin = getCharMin();
  const charMax = 140;
  return runGenerator(genarator, charMin, charMax);
};

const createTextOutputInterval = ms => data => {
  setInterval(() =>  console.log(createTextOutput(data)), ms);
};

const getCharMin = () => {
  const min = 20;
  const max = 70;
  const rand = Math.floor(Math.random() * max);
  return min + rand;
};

const runGenerator = (genarator, charMin, charMax) => {
  const value = genarator.generate();
  if (value.length > charMax) {
    genarator.clear();
    return runGenerator(genarator, charMin, charMax);
  } else if (value.length > charMin) {
    return value;
  } else {
    return runGenerator(genarator, charMin, charMax);
  }
};

fetchContent(clang.env.content.url)
  .then(createTextOutputInterval(3000));

app.listen(3000, () => console.log('Running'));
