import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../../components/LoadingIndicator'
import Post from '../Post'
import css from './style.css'

class BySlug extends Component {
  render() {
    return (
      <div className={css.root}>
        {this.props.loading
          ? <LoadingIndicator />
          : <Post {...this.props.post} />
        }
      </div>
    )
  }
}


export default connect(
  state => ({
    post: state.global.post,
    loading: state.global.loading,
  })
)(BySlug)
