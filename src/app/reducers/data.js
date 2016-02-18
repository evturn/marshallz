export default function data(state={
  posts: null,
  authors: null,
  isFetching: false,
  done: false,
  section: null,
  detail: {
    post: null,
    author: null,
  },
  author: {
    posts: null,
    author: null
  }
}, action) {
  switch (action.type) {
    case 'TRANSITION_INIT': {
      const { payload } = action;

      return Object.assign({}, state, {
        done: false,
        ...payload
      });
    }
    case 'TRANSITION_UNMOUNT':
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        detail: {
          post: null,
          author: null
        },
        author: {
          posts: null,
          author: null
        }
      });
    case 'NETWORK_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'NETWORK_RESPONSE': {
      const { payload } = action;

      return Object.assign({}, state, {
        isFetching: false,
        ...payload
      });
    }
    case 'TRANSITION_DONE':
      return Object.assign({}, state, {
        done: true
      });
    case 'NETWORK_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      });
    default:
      return state;
  }
}