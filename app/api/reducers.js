import { combineReducers } from 'redux'

const loadingReducer = (state=false, action) => {
  switch (action.type) {

    case 'FETCH_INITIAL_DATA':
    case 'FETCH_BY_AUTHOR':
    case 'FETCH_POST':
    case 'FETCH_BY_DATE':
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

    case 'FETCH_INITIAL_DATA':
    case 'FETCH_BY_AUTHOR':
    case 'FETCH_BY_DATE':
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
      return action.authors

    default:
      return state
  }
}

const authorReducer = (state=null, action) => {
  switch (action.type) {

    case 'FETCH_SUCCESS':
      return action.author || state

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

export default combineReducers({
  posts: postsReducer,
  authors: authorsReducer,
  author: authorReducer,
  error: errorReducer,
  loading: loadingReducer,
})