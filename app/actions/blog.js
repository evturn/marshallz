import fetch from 'isomorphic-fetch';

let API_ENDPOINT = '/blogPost';

const requestPosts = () => {
  return {
    type: 'REQUEST_POSTS'
  };
};

const receivedPosts = posts => {
  return {
    type: 'RECEIVED_POSTS',
    posts: posts
  };
};

const requestError = error => {
  return {
    type: 'REQUEST_ERROR',
    message: error
  };
};


const createRequest => (method, data) => {
  return fetch(API_ENDPOINT, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const getBlogPosts = () => {
  return dispatch => {
    dispatch(requestPosts());

    return createRequest('get')
      .then(res => res.json())
      .then(json => dispatch(receivedPosts(json.blog.posts)))
      .catch(err => dispatch(requestError(err)));
  };
}
