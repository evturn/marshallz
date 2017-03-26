import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './api/configureStore'
import App from 'containers/App'

const Root = () => {
  return (
    <Provider store={configureStore()}>
      <App />
    </Provider>
  )
}

render(<Root />, document.getElementById('app'))