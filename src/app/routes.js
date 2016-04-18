import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import BlogPosts from 'containers/BlogPosts';
import Detail from 'containers/Detail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BlogPosts} />
    <Route path="author/:author" component={BlogPosts} />
    <Route path="post/:post" component={Detail} />
  </Route>
);
