export default function blog(state = {
  post: {},
  isFetching: false,
  isCompleted: false,
  hasOne: false,
  fixed: false,
  perPage: 10
}, action) {
  switch (action.type) {
    case 'FETCH_POST':
      return Object.assign({}, state, {
        hasOne: false,
        isFetching: true
      })
    case 'FETCH_SUCCESS': {
      return Object.assign({}, state, {
        hasOne: true,
        isFetching: false,
        post: action.payload
      })
    }
    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })
    case 'FILTER_POSTS':
      return Object.assign({}, state, {
        ...action.payload
      })
    default:
      return state
  }
}