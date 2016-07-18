import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { Observable } from 'rx'
import configureStore from 'store'
import routes from 'routes'
import { createPage, fetchLocals } from 'store/api'

export default (req, res) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      Observable.fromPromise(fetchLocals)
        .map(blog => configureStore({ blog }))
        .map(store => ({
          html: renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>),
          initialState: store.getState()
        }))
        .subscribe(({ html, initialState }) => res.send(createPage(html, initialState)))
    } else {
      res.status(404).send('Not found')
    }
  })
}