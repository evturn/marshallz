import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Match } from 'react-router'
import Navigation from '../Navigation'
import configureStore from '../../store'
import 'sanitize.css/sanitize.css'

const store = configureStore()

const App = _ => (
  <Provider store={store}>
    <BrowserRouter>
      <Match pattern="*" component={Navigation} />
    </BrowserRouter>
  </Provider>
)

export default App
