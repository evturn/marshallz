import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reduxObservable } from 'redux-observable'
import rootReducer from '../reducers';
import logger from 'redux-logger'
import bots from '../../bots/public'
import Robo from '../components'

const initialState = {
  SB: {
    bots,
    selected: false
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(logger(), reduxObservable()), window.devToolsExtension())
)

render(
<Provider store={store}>
  <Robo />
</Provider>,
  document.getElementById('app')
)