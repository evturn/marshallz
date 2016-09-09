import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import logger from 'redux-logger'
import rootReducer from './reducers'
import rootEpic from './epics'

export default function configureStore(initialState={}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        createEpicMiddleware(rootEpic),
        routerMiddleware(browserHistory)
      )
    )
  )
  return store
}
