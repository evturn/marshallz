import { combineReducers } from 'redux'
import appReducer from './App/reducer'

export default combineReducers({
  global: appReducer,
})
