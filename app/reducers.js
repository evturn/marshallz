import { combineReducers } from 'redux'
import appReducer from './containers/Navigation/reducer'
import locationParamsReducer from './containers/ByAuthor/reducer'

export default combineReducers({
  global: appReducer,
  routing: combineReducers({
    params: locationParamsReducer,
  })
})
