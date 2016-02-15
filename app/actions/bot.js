import fetch from 'isomorphic-fetch';

let API_ENDPOINT = '/blogPost';

const botsPopulated = bots => {
  return {
    type: 'BOTS_POPULATED',
    bots
  };
};

const requestError = error => {
  return {
    type: 'REQUEST_ERROR',
    message: error
  };
};

const authorSelected = data => {
  console.log(data);
  return {
    type: 'AUTHOR_SELECTED',
    posts: data.posts,
    author: data.author
  };
};


const createRequest = (method, data) => {
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

export const navigateToAuthor = (dispatch, username, bots) => {
  const [ author ] = bots.filter(bot => bot.username === username);
  const posts = author.posts;

  dispatch(authorSelected({ author, posts }));
};

export const fetchBots = () => {
  return dispatch => {
    dispatch(requestPosts());

    return createRequest('get')
      .then(res => res.json())
      .then(json => dispatch(botsPopulated(json.bot)))
      .catch(err => dispatch(requestError(err)));
  };
}
