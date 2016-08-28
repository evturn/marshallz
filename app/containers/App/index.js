import React, { Component } from 'react'
import Header from '../../components/Header'
import Background from './bg.jpg'
import 'sanitize.css/sanitize.css'
import css from './styles.css'

export default class App extends Component {
  render() {
    return (
      <div className={css.site}>
        <Header />
        <div
          className={css.content}
          style={{ backgroundImage: `url(${Background})` }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
