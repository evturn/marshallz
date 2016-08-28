import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from '../App'
import Landing from '../Landing'
import PostsByAuthor from '../PostsByAuthor'

export default _ => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="authors/:author" component={PostsByAuthor} />
    </Route>
  </Router>
)
