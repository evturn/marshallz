import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import {
  applyRouterMiddleware,
  Route,
  IndexRoute,
  Router,
  browserHistory
} from 'react-router'
import useScroll from 'react-router-scroll'
import selectTippyTop from 'utils/scroll'

import App from 'containers/App'
import Home from 'containers/Home'
import Profile from 'components/Profile'
import Detail from 'containers/Detail'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll(selectTippyTop))}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route component={Home} >
          <Route path="author/:author" component={Profile} />
        </Route>
        <Route path="post/:post" component={Detail} />
      </Route>
    </Router>
  </Provider>
)

Root.PropTypes = {
  store: PropTypes.object.isRequired
}

export default Root
