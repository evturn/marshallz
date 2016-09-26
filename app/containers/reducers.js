import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from './App/reducer'

export default combineReducers({
  global: appReducer,
  routing: routerReducer,
})