import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import logger from 'redux-logger'
import rootReducer from './reducers'
import rootEpic from './epics'

export default function configureStore() {
  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(
        createEpicMiddleware(rootEpic),
        routerMiddleware(browserHistory)
      )
    )
  )
  return store
}