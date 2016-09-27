import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Post'
import A from '../../components/A'
import Img from '../../components/Img'
import * as Actions from './actions'
import css from './styles.css'

class Landing extends Component {
  render() {
    return (
      <div className={css.landing}>
        <Posts posts={this.props.posts} />
        <SidePanel authors={this.props.authors} />
      </div>
    )
  }
}

const Posts = ({ posts }) => (
  <div className={css.posts}>
    {posts.map((x, i) =>
      <Post
        { ...x }
        key={x._id}
        index={i}
      />
    )}
  </div>
)

const SidePanel = ({ authors }) => (
  <div className={css.root}>
    <ul>
      <li className={css.title}>Writers</li>
      {authors.map(x =>
        <li
          key={x._id}
          className={css.li}>
          <A
            className={css.sidelink}
            pathname={x.blog.url}>
            <Img
              className={css.hg}
              src={require(`images/${x.profile_img}`)} />
            <span className={css.name}>{x.name}</span>
          </A>
        </li>
      )}
    </ul>
  </div>
)

export default connect(
  (state, ownProps) => ({
    pathname: ownProps.location.pathname,
    query: ownProps.location.query,
    loading: state.global.loading,
    error: state.global.error,
    posts: state.global.posts,
    authors: state.global.authors,
    author: state.global.author,
    meta: state.global.meta,
  }),
  Actions
)(Landing)
