import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reduxObservable } from 'redux-observable'
import rootReducer from '../reducers';
import logger from 'redux-logger'
import bots from '../../bots/public'
// import { App, Bots, Bot } from '../components'
import Robo from '../components'

function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(logger(), reduxObservable()), window.devToolsExtension()))
}

const store = configureStore({
  bot: {
    bots,
    selected: false
  }
})

render(
<Provider store={store}>
  <Robo />
</Provider>,
  document.getElementById('app')
)