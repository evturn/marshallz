import { createStore, applyMiddleware } from 'redux'
import { reduxObservable } from 'redux-observable'

export default createStore(
  rootReducer,
  applyMiddleware(reduxObservable())
)