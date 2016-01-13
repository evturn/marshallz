import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import md5 from 'spark-md5';
import * as types from 'constants';

polyfill();

let API_ENDPOINT = '/bot';
if (__TEST__) { API_ENDPOINT = 'http://localhost:9876/bot'; }

const CORS_GET = {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

function createRequest(method, data) {
  return fetch(API_ENDPOINT, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


function getBotsSuccess(bots) {
  return {
    type: types.GET_BOTS_SUCCESS,
    blogPosts: bots
  };
}

function getBotsError(error) {
  return {
    type: types.GET_BOTS_ERROR,
    message: error
  };
}

function getBotsBegin() {
  return { type: types.GET_BOTS_BEGIN };
}

export function getBots() {
  return dispatch => {
    dispatch(getBotsBegin());

    return createRequest('get')
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(getBotsSuccess(json));
      })
      .catch(err => {
        dispatch(getBotsError(err));
      });
  };
}
