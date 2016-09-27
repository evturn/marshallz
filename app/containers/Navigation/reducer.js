export default (state={
  loading: false,
  error: null,
  posts: [],
  authors: [],
  author: {},
  meta: {},
}, action) => {
  switch (action.type) {

    case 'FETCH':
      return Object.assign({}, state, {
        url: action.payload.url,
        loading: true,
      })

    case 'FETCH_BY_AUTHOR':
      return Object.assign({}, state, {
        url: action.payload.url,
        loading: true,
      })

    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload,
        loading: false
      })

    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        error: payload.error,
        loading: false
      })

    default:
      return state
  }
}
