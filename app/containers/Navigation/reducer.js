export default (state={
  loading: false,
  error: null,
  posts: [],
  authors: [],
  author: {},
  meta: {},
  url: null,
}, action) => {
  switch (action.type) {

    case 'FETCH_INITIAL_DATA':
      return Object.assign({}, state, {
        loading: true,
      })

    case 'INITIAL_FETCH_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload,
        loading: false,
      })

    case 'FETCH':
      return Object.assign({}, state, {
        loading: true,
      })

    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload,
        loading: false,
      })

    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        error: action.payload.error,
        loading: false,
      })

    case 'NAVIGATE_TO_SINGLE_POST':
      return Object.assign({}, state, {
        meta: {},
      })

    default:
      return state
  }
}
