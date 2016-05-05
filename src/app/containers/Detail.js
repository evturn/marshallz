import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from 'actions'
import Post from 'components/Post'
import Profile from 'components/Profile'
import classNames from 'classnames/bind'
import css from 'less/components/detail.less'

const cx = classNames.bind(css)

class Detail extends Component {
  componentWillMount() {
    fetchPost(this.props.params.post)(this.context.store)
  }

  render() {
    const { hasOne, post} = this.props

    return (
      <div className={cx('detail')}>
        {hasOne ? <Profile />  : null}
        {hasOne ? <Post {...post}/> : null}
      </div>
    )
  }
}

Detail.propTypes = {
  hasOne: PropTypes.bool,
  author: PropTypes.object,
  dispatch: PropTypes.func
}

Detail.contextTypes = {
  store: PropTypes.object
}

export default connect(
  state => ({
    post: state.blog.post,
    author: state.blog.author,
    hasOne: state.blog.hasOne
  })
)(Detail)