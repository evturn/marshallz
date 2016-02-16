function blog(state={
  posts: [],
  post: null,
  isFetching: false
}, action) {
  switch (action.type) {
    case 'REQUESTING_POSTS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVED_POSTS':
      return Object.assign({}, state, {
        posts: action.posts,
        isFetching: true
      });
    case 'REQUESTING_POST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVED_POST':
      return Object.assign({}, state, {
        post: action.post,
        isFetching: true
      });
    case 'REQUEST_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        isFetching: false
      });
    default:
      return state;
  }
}

export default blog