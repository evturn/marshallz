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

    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        authors: action.payload.authors,
        post: action.payload.post,
        posts: action.payload.posts,
        meta: action.payload.meta,
        loading: false,
      })

    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        error: action.payload.error,
        loading: false,
      })

    default:
      return state
  }
}
