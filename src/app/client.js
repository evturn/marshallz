import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store'
import routes from 'routes'
import { scrollWindowTop } from 'store/api'

const store = configureStore(window.__INITIAL_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} onUpdate={scrollWindowTop}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
)