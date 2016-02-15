import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'containers/App';
import Blog from 'containers/Blog';
import Detail from 'containers/Detail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Blog} />
    <Route path="post/:slug" component={Detail} />
  </Route>
);
