import { combineReducers } from 'redux'

const loadingReducer = (state=false, action) => {
  switch (action.type) {

    case 'FETCH':
      return true

    case 'FETCH_SUCCESS':
    case 'FETCH_ERROR':
      return false

    default:
      return state
  }
}

const errorReducer = (state=null, action) => {
  switch (action.type) {

    case 'FETCH':
      return null

    case 'FETCH_ERROR':
      return action.payload.error.message

    default:
      return state
  }
}

const postsReducer = (state=[], action) => {
  switch (action.type) {

    case 'FETCH_SUCCESS':
      return action.posts

    default:
      return state
  }
}

const authorsReducer = (state=[], action) => {
  switch (action.type) {

    case 'AUTHORS_FETCHED':
      console.log(action)
      return action.authors

    default:
      return state
  }
}

const authorReducer = (state=null, action) => {
  switch (action.type) {

    case 'FETCH_BY_AUTHOR':
      return action.payload.author

    default:
      return state
  }
}

// const paginationReducer = (state={}, action) => {
//     switch (action.type) {

//     case 'FETCH_SUCCESS':
//       return action.payload.meta || {}

//     default:
//       return state
//   }
// }

const locationParamsReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_LOCATION_PARAMS':
      return action.payload.params

    case 'UNSET_LOCATION_PARAMS':
      return null

    default:
      return state
  }
}

export default combineReducers({
  global: combineReducers({
    posts: postsReducer,
    authors: authorsReducer,
    author: authorReducer,
    // meta: paginationReducer,
    error: errorReducer,
    loading: loadingReducer,
  }),
})