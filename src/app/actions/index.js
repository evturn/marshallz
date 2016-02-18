import fetch from 'isomorphic-fetch';

const transitionInitAction = payload => {
  console.log(payload);
  return {
    type: 'TRANSITION_INIT',
    payload
  };
};

const networkRequestAction = () => {
  console.log(`request action`);
  return {
    type: 'NETWORK_REQUEST'
  };
};

const networkResponseAction = payload => {
  console.log(payload);
  return {
    type: 'NETWORK_RESPONSE',
    payload
  };
};

const transitionDoneAction = () => {
  return {
    type: 'TRANSITION_DONE'
  };
};

const transitionUnmountAction = () => {
  return {
    type: 'TRANSITION_UNMOUNT'
  };
};

const networkErrorAction = message => {
  return {
    type: 'NETWORK_ERROR',
    message
  };
};

const request = (endpoint) => {
  return ;
};

const createTimeout = (action, duration, dispatch) => {
  return setTimeout(() => dispatch(action()), duration);
};

const createTransition = (payload, dispatch) => {
  dispatch(transitionInitAction(payload));
};

const createRequest = (endpoint, dispatch) => {
  dispatch(networkRequestAction());

  fetch(endpoint, {
      method: 'get',
      credentials: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then(res     => res.json())
    .then(payload => {
      return dispatch(networkResponseAction({
        detail: {
          post: payload
        }
      }))
    })
    .then(()      => createTimeout(transitionDoneAction, 1000, dispatch))
    .catch(err    => dispatch(networkErrorAction(err)));
};

export const transitionToDetail = (slug, dispatch) => {
  createTransition({ section: 'detail' }, dispatch);
  createRequest(`/api/post/${slug}`, dispatch);
};

export const transitionToAuthor = (author, dispatch) => {
  const payload = {
    author: {
      author,
      posts: author.posts
    },
    section: 'author'
  };
  createTransition(payload, dispatch);
  createTimeout(transitionDoneAction, 1000, dispatch)
};

export const transitionToHome = dispatch => {
  dispatch(transitionInitAction({ section: 'home' }));
};

export const unmount = dispatch => {
  dispatch(transitionUnmountAction());
};