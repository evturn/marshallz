import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import rootEpic from 'api/epics'
import rootReducer from 'api/reducers'

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
    module.hot.accept('api/reducers', _ => {
      const nextRootReducer = require('api/reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
