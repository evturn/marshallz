import { combineReducers } from 'redux'
import appReducer from './containers/Navigation/reducer'

export default combineReducers({
  global: appReducer,
})
