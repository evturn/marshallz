import React, { Component } from 'react'
import { render } from 'react-dom'
import bots from '../../bots/public'
import './less/style.less'

class Bot extends Component {
  render() {
    return (
      <div className='bot'>
        <img src={this.props.headshot} />
        <div>{this.props.displayName}</div>
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
      <div className="root">
        <header>
          <div className="header">
            <div className="logo">
              <div className="top">Run</div>
              <div className="bottom">Bot</div>
            </div>
          </div>
        </header>
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