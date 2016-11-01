import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from 'containers/Post'
import LoadingIndicator from 'components/LoadingIndicator'
import css from './styles.css'

class ByDate extends Component {
  render() {
    return (
      <div className={css.posts}>

        {this.props.loading
          ? <LoadingIndicator />
          : this.props.posts
            ? this.props.posts.map((x, i) =>
                <Post
                  { ...x }
                  key={i}
                />
              )
            : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({ posts: state.global.posts })
)(ByDate)
