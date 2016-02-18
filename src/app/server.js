import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import routes from './routes';
import configureStore from './store/configureStore';

import headconfig from 'elements/Header';

function fetchInitialData(callback) {
  fetch(`http://localhost:3000/blogPost`)
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => console.log(err));
}

function renderFullPage(renderedContent, initialState) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      ${headconfig.title}
      ${headconfig.meta}
      ${headconfig.link}
    </head>
    <body>

      <div id="app">${renderedContent}</div>

      <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
      <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
      <script (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-72542250-1', 'auto');
        ga('send', 'pageview');
      </script>

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
      fetchInitialData(data => {
        const store = configureStore({
          data: {
            posts: data.posts,
            authors: data.authors,
            isFetching: false,
            done: false,
            section: null,
            detail: {
              post: null,
              author: null,
            },
            author: {
              posts: null,
              author: null
            }
          }
        })
        const initialState = store.getState();
        const virtualDOM = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const renderedPage = renderFullPage(renderToString(virtualDOM), initialState);

        res.status(200).send(renderedPage);
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
};