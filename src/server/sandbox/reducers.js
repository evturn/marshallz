import { combineReducers } from 'redux'
import { RUN_BOT, SELECT_OPTION, CLEAR_CONSOLE } from './actions'

const SB = (state = {
  logs: [],
  _logs: [],
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
        logs: action.payload.logs,
        _logs: [ ...state._logs ].concat([ action.payload.log ])
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