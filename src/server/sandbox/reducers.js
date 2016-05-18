import { combineReducers } from 'redux'
import { FETCH_BOT_PENDING, FETCH_BOT_FULFILLED, FETCH_BOT_ABORTED,
SELECT_BOT, SELECT_JOB } from './actions'

const SB = (state = {
  isLoading: false
}, action) => {
  switch (action.type) {
    case FETCH_BOT_PENDING:
      return { ...state, isLoading: true }

    case FETCH_BOT_FULFILLED:
      return { ...state, isLoading: false, ...action.payload }

    case SELECT_BOT:
      return {
        ...state,
        isLoading: false,
        selected: {
          ...state.selected,
          bot: action.payload
        }
      }

    case SELECT_JOB:
      return {
        ...state,
        isLoading: false,
        selected: {
          ...state.selected,
          job: action.payload
        }
      }

    case FETCH_BOT_ABORTED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default combineReducers({ SB })