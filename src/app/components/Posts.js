import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Post from 'components/Post'
import classNames from 'classnames/bind'
import css from 'less/components/posts.less'

const cx = classNames.bind(css)

class Posts extends Component {
  render() {
    const { posts } = this.props
    return (
      <div className={cx('posts')}>{posts.map((x, i) =>
        <Post key={i} { ...x } />
      )}</div>

    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts