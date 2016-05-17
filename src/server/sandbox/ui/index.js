import React, { Component } from 'react'
import { render } from 'react-dom'
import bots from '../../bots/public'

class Bots extends Component {
  render() {
    return (
      <div>
        {this.props.bots.map(x => <div key={x.name}>{x.name}</div>)}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div>Run</div>
        {this.props.children}
      </div>
    )
  }
}

render(
  <App>
    <Bots bots={bots} />
  </App>,
  document.getElementById('app')
)