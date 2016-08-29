import React from 'react'
import App from '../App'
import Landing from '../Landing'
import PostsByAuthor from '../PostsByAuthor'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware
} from 'react-router'
import useScroll from 'react-router-scroll'

export default _ => (
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="authors/:author" component={PostsByAuthor} />
    </Route>
  </Router>
)
