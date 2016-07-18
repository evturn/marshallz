import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger';
import rootReducer from 'reducers';

export default function configureStore(initialState={}, history) {
  const middlewares = [
    createEpicMiddleware(),
  ]

  __DEV__
    ? middlewares.push(logger())
    : null

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  return store
}
