import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from 'actions'
import Post from 'components/Post'
import classNames from 'classnames/bind'
import css from 'less/components/home.less'

const cx = classNames.bind(css)

class Detail extends Component {
  componentDidMount() {
    fetchPost(this.props.params.post)(this.context.store)
  }

  render() {
    const { hasOne, post} = this.props

    return (
      <div className={cx('posts')}>
        {hasOne ? <Post {...post}/> : null}
      </div>
    )
  }
}

Detail.propTypes = {
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func
}

Detail.contextTypes = {
  store: PropTypes.object
}

export default connect(
  state => ({
    post: state.blog.post,
    hasOne: state.blog.hasOne
  })
)(Detail)