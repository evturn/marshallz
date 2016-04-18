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
    case 'FETCH_POST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'FETCH_SUCCESS': {
      return Object.assign({}, state, {
        isFetching: false,
        post: action.payload
      });
    }
    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      });
    case 'FILTER_POSTS':
      return Object.assign({}, state, {
        ...action.payload
      });
    default:
      return state;
  }
}