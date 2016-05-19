import { combineReducers } from 'redux'
import { RUN_BOT, SELECT_OPTION, CLEAR_CONSOLE } from './actions'

const SB = (state = {
  logs: [],
  isLoading: false,
  ready: false,
  selected: {
    bot: false,
    job: false,
    src: false
  }
}, action) => {
  switch (action.type) {

    case CLEAR_CONSOLE:
      return {
        ...state,
        logs: []
      }

    case RUN_BOT:
      return Object.assign({}, state, {
        ...state,
        logs: [ ...state.logs, action.payload ]
      })

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