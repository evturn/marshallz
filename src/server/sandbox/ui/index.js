import React, { Component } from 'react'
import { render } from 'react-dom'
import bots from '../../bots/public'
import './less/style.less'

class Bot extends Component {
  render() {
    return (
      <div className='bot'>
        <div>{this.props.name}</div>
        <img className="img" src={this.props.headshot} />
        <div>Select</div>
      </div>
    )
  }
}

class Bots extends Component {
  render() {
    return (
      <div>
        {this.props.bots.map(x => <Bot key={x.name} { ...x } />)}
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