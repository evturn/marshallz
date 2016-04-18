import fetch from 'isomorphic-fetch';

const actions = {
  fetchPost:          _ => ({ type: 'FETCH_POST' }),
  fetchSuccess: payload => ({ type: 'FETCH_SUCCESS', payload }),
  fetchError:    message => ({ type: 'FETCH_ERROR', message }),
  filterPosts:  payload => ({ type: 'TRANSITION_INIT', payload })
};

export const fetchPost = slug => dispatch => {
  fetch(`/api/post/${slug}`)
    .then(res => res.json())
    .then(res => dispatch(actions.fetchSuccess(res.blog.post)))
    .catch(err => dispatch(actions.fetchError(err)));
};