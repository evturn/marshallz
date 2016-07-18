export default function blog(state = {
  post: {},
  author: {},
  authors: [],
  filter: {},
  showing: [],
  pagination: {},
  isFetching: false,
  isFiltered: false,
  isCompleted: false,
  hasOne: false,
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
        ...action.payload
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
    case 'DISPLAY_AUTHOR':
      return Object.assign({}, state, {
        ...action.payload
      })
    default:
      return state
  }
}