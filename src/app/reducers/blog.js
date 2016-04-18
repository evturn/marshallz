export default function blog(state = {
  section: '',
  filter: {},
  showing: [],
  pagination: {
    perPage: 2,
    pages: 0,
    total: 0,
    first: 1,
    last: 1,
    buttons: []
  },
  authors: [],
  posts: [],
  post: {},
  isFetching: false,
  isCompleted: false,
  hasOne: false,
  done: true
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