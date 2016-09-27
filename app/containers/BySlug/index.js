import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Post'
import css from './style.css'

class BySlug extends Component {
  render() {
    return (
      <div className={css.root}>
        <Post {...this.props.post} />
      </div>
    )
  }
}


export default connect(
  state => ({
    post: state.global.post,
  })
)(BySlug)
