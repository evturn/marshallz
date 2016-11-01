import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import css from './styles.css'

 class Post extends Component {
  render() {
    return (
      <div className={css.root}>
        <PostHeader {...this.props} />
        <PostContent {...this.props} />
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: state.loading,
  }))(Post)
