import React from 'react';
import Route from 'react-router';

import App from 'containers/App';
import Blog from 'containers/Blog';
import About from 'containers/About';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import { requireAuthentication } from 'components/authenticateComponent';

export default (
  <Route component={App}>
    <Route path="/" component={Blog} />
  </Route>
);
