import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import rootEpic from './epics'
import rootReducer from './reducers'

export default function configureStore(initialState={}) {
  const middleware = [ createEpicMiddleware(rootEpic) ]

  if (__DEV__) {
    middleware.push(logger())
  }

  const enhancers = [ applyMiddleware(...middleware) ]
  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  if (module.hot) {
    module.hot.accept('./reducers', _ => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
