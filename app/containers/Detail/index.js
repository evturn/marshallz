import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from 'actions'
import Post from 'components/Post'
import Profile from 'components/Profile'
import css from './styles.css'

class Detail extends Component {
  componentWillMount() {
    fetchPost(this.props.params.post)(this.context.store)
  }

  render() {

    return (
      <div className={css.detail}>
        {this.props.hasOne ? <Profile />  : null}
        {this.props.hasOne ? <Post {...this.props.post} /> : null}
      </div>
    )
  }
}

Detail.propTypes = {
  hasOne: PropTypes.bool,
  author: PropTypes.object
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
