import React from 'react';
import Route from 'react-router';

import App from 'containers/App';
import Blog from 'containers/Blog';

export default (
  <Route component={App}>
    <Route path="/" component={Blog} />
  </Route>
);
