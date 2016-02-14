import fetch from 'isomorphic-fetch';

let API_POSTS = '/blogPost';
let API_POST = '/api/post';

const requestPosts = () => {
  return {
    type: 'REQUEST_POSTS'
  };
};

const requestPost = () => {
  return {
    type: 'REQUEST_POST'
  };
};

const receivedPost = post => {
  return {
    type: 'RECEIVED_POST',
    post
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


const createRequest = (method, endpoint) => {
  return fetch(endpoint, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  });
};

export const getBlogPosts = () => {
  return dispatch => {
    dispatch(requestPosts());

    return createRequest('get', API_POSTS)
      .then(res => res.json())
      .then(json => dispatch(receivedPosts(json.blog.posts)))
      .catch(err => dispatch(requestError(err)));
  };
}

export const getBlogPost = (slug, dispatch) => {
    return dispatch => {
    dispatch(requestPost());

    return createRequest('get', `${API_POST}/${slug}`)
      .then(res => res.json())
      .then(json => dispatch(receivedPost(json)))
      .catch(err => dispatch(requestError(err)));
  };
}
