import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from 'routes.jsx';
import configureStore from 'store/configureStore';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = createBrowserHistory();

syncReduxAndRouter(history, store);
render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));


