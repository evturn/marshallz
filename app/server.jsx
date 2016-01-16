import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router'
import createLocation from 'history/lib/createLocation';
import fetch from 'isomorphic-fetch';
import { Provider } from 'react-redux';
import routes from 'routes.jsx';
import configureStore from 'store/configureStore';
import headconfig from 'elements/Header';


const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

function fetchAll(callback) {
  fetch(`http://${clientConfig.host}:${clientConfig.port}/blogPost`)
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => console.log(err));
}


function renderFullPage(renderedContent, initialState, head={
  title: 'Marshallz Blog',
  meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
}) {
  return `
    <!doctype html>
    <html lang="">
    <head>
      ${head.title}
      ${head.meta}
      ${head.link}
    </head>
    <body>

      <div id="app">${renderedContent}</div>

      <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
      <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>
  `;
}

export default function render(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      fetchAll(apiResult => {
        const store = configureStore({
          blogPost: {
            blogPosts: apiResult
          }
        });
        const initialState = store.getState();
        const renderedContent = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>);
        const renderedPage = renderFullPage(renderedContent, initialState, {
          title: headconfig.title,
          meta: headconfig.meta,
          link: headconfig.link
        });
        res.status(200).send(renderedPage);
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
};