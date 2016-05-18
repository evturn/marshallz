import { combineReducers } from 'redux'
import { RUN_WAITING, SELECT_OPTION } from './actions'

const SB = (state = {
  isLoading: false,
  ready: false,
  selected: {
    bot: false,
    job: false,
    src: false
  }
}, action) => {
  switch (action.type) {

    case RUN_WAITING:
      return {
        ...state,
        ready: false
      }

    case SELECT_OPTION: {

      return {
        ...state,
        selected: {
          ...state.selected,
          ...action.payload
        }
      }
    }

    default:
      return state
  }
}

export default combineReducers({ SB })