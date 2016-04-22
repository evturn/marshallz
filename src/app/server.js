import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
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
      fetchLocals(res => configureStore({ blog: res.blog }))
      .then(store => {
        const initialState = store.getState()
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>)

        res.status(200).send(createPage(html, initialState))
      })
    } else {
      res.status(404).send('Not found')
    }
  })
}