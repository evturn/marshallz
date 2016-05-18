import { combineReducers } from 'redux'
import { FETCH_BOT_PENDING, FETCH_BOT_FULFILLED, FETCH_BOT_ABORTED,
SELECT_BOT_FULFILLED } from './actions'

const SB = (state = {
  isLoading: false,
  selected: {}
}, action) => {
  switch (action.type) {
    case FETCH_BOT_PENDING:
      return { ...state, isLoading: true }

    case FETCH_BOT_FULFILLED:
      return { ...state, isLoading: false, ...action.payload }

    case SELECT_BOT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selected: action.payload
      }

    case FETCH_BOT_ABORTED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default combineReducers({ SB })