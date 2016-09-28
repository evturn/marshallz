import { combineReducers } from 'redux'
import appReducer, { routeReducer } from './containers/Navigation/reducer'
import locationParamsReducer from './containers/ByAuthor/reducer'

export default combineReducers({
  global: appReducer,
  routing: combineReducers({
    params: locationParamsReducer,
    url: routeReducer,
  })
})
