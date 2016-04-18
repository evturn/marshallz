import fetch from 'isomorphic-fetch';

const actions = {
  transitionInitAction:  payload => ({ type: 'TRANSITION_INIT', payload }),
  networkRequestAction:        _ => ({ type: 'NETWORK_REQUEST' }),
  networkResponseAction: payload => ({ type: 'NETWORK_RESPONSE', payload }),
  transitionUnmountAction:     _ => ({ type: 'TRANSITION_UNMOUNT' }),
  networkErrorAction:    message => ({ type: 'NETWORK_ERROR', message })
};

export const transitionToDetail = (slug, dispatch) => {
  dispatch(actions.transitionInitAction({ section: 'detail' }));
  fetch(`/api/post/${slug}`, {
      method: 'get',
      credentials: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(payload => {
      dispatch(actions.networkResponseAction({ detail: { post: payload } }))
    })
    .catch(err => dispatch(actions.networkErrorAction(err)));
};

export const transitionToAuthor = (author, dispatch) => {
  const { posts } = author;

  dispatch(actions.transitionInitAction({
    author: { author, posts },
    section: 'author'
  }));
};

export const transitionToHome = dispatch => {
  dispatch(actions.transitionInitAction({ section: 'home' }));
};

export const unmount = dispatch => {
  dispatch(actions.transitionUnmountAction());
};