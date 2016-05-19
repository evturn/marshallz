import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reduxObservable } from 'redux-observable'
import rootReducer from '../reducers';
import createLogger from 'redux-logger'
import bots from '../../bots/public'
import Robo from '../components'

const initialState = {
  SB: {
    bots,
    jobs: [
      { name: 'Blog', icon: 'fa fa-file-text-o' },
      { name: 'Twitter', icon: 'fa fa-hashtag' }
    ],
    srcs: [
      {name: 'Archive', icon: 'fa fa-archive'},
      {name: 'RSS', icon: 'fa fa-rss'}
    ],
    selected: {
      bot: false,
      job: false,
      src: false
    },
    logs: [],
    _logs: []
  }
}

const logger = createLogger({
  stateTransformer: state => ({ ...state.SB })
})
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(reduxObservable(), logger), window.devToolsExtension())
)

render(
<Provider store={store}>
  <Robo />
</Provider>,
  document.getElementById('app')
)