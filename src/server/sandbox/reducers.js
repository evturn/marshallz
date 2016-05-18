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

    case SELECT_OPTION: {
      const selected = {
        ...state.selected,
        ...action.payload
      }
      const { bot, job, src } = selected
      const ready = bot && job && src

      return {
        ...state,
        ready,
        selected
      }
    }

    default:
      return state
  }
}

export default combineReducers({ SB })