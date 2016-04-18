import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Detail from './containers/Detail';
import Author from './containers/Author';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="post/:post" component={Detail} />
    <Route path="author/:username" component={Author} />
  </Route>
);
