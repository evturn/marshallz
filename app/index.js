import 'rxjs'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './containers/store'
import App from './containers/App'
import Landing from './containers/Landing'
import PostsByAuthor from './containers/PostsByAuthor'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="authors/:author" component={PostsByAuthor} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
