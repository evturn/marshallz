import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import Home from 'containers/Home'
import Profile from 'components/Profile'
import Detail from 'containers/Detail'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route component={Home} >
      <Route path="author/:author" component={Profile} />
    </Route>
    <Route path="post/:post" component={Detail} />
  </Route>
);