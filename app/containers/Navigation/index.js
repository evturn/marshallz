import React, { Component, PropTypes } from 'react'
import Match from 'react-router/Match'
import Header from '../../components/Header'
import Landing from '../Landing'
import PostsByAuthor from '../PostsByAuthor'
import Background from './bg.jpg'
import css from './styles.css'

import { connect } from 'react-redux'

class Navigation extends Component {
  render() {
    return (
      <div className={css.site}>
        <Header />
        <div
          className={css.content}
          style={{ backgroundImage: `url(${Background})` }}>
          <Match pattern="/" component={Landing} />
          <Match pattern="authors/:author" component={PostsByAuthor} />
        </div>
      </div>
    )
  }
}

export default Navigation
