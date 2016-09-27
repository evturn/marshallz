import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Post'
import css from './styles.css'

class ByDate extends Component {
  render() {
    return (
      <div className={css.posts}>
        {this.props.posts.map((x, i) =>
          <Post
            { ...x }
            key={x._id}
            index={i}
          />
        )}
      </div>
    )
  }
}

export default connect(
  state => ({ posts: state.global.posts })
)(ByDate)
