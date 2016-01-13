// Including es6-promise so isomorphic fetch will work
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import md5 from 'spark-md5';
import * as types from 'constants';

polyfill();

let API_ENDPOINT = '/blogPost';
if (__TEST__) { API_ENDPOINT = 'http://localhost:9876/blogPost'; }

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


function getBlogPostsSuccess(blogPosts) {
  console.log(blogPosts.response);
  return {
    type: types.GET_BLOG_POSTS_SUCCESS,
    blogPosts: blogPosts
  };
}

function getBlogPostsError(error) {
  return {
    type: types.GET_BLOG_POSTS_ERROR,
    message: error
  };
}

function getBlogPostsBegin() {
  return { type: types.GET_BLOG_POSTS_BEGIN };
}

export function getBlogPosts() {
  return dispatch => {
    dispatch(getBlogPostsBegin());

    return createRequest('get')
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(getBlogPostsSuccess(json));
      })
      .catch(err => {
        dispatch(getBlogPostsError(err));
      });
  };
}
