import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import css from './styles.css'

@connect(state => ({
  loading: state.loading,
}))

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

export default Post