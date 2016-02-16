import fetch from 'isomorphic-fetch';

let API_ENDPOINT = '/blogPost';

const authorsPopulated = authors => {
  return {
    type: 'AUTHORS_POPULATED',
    authors
  };
};

const requestError = error => {
  return {
    type: 'REQUEST_ERROR',
    message: error
  };
};

const authorSelected = data => {
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

export const navigateToAuthor = (dispatch, username, authors) => {
  const [ author ] = authors.filter(author => author.username === username);
  const posts = author.posts;

  dispatch(authorSelected({ author, posts }));
};

export const fetchAuthors = () => {
  return dispatch => {
    dispatch(requestPosts());

    return createRequest('get')
      .then(res => res.json())
      .then(json => dispatch(authorsPopulated(json.author)))
      .catch(err => dispatch(requestError(err)));
  };
}
