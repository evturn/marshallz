import { combineReducers } from 'redux'
import { RUN_BOT, SELECT_OPTION } from './actions'

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

    case RUN_BOT:
      console.log(action.payload)
      return {
        ...state
      }

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