function blog(state={
  posts: [],
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