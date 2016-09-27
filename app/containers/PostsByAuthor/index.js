import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Post'
import A from '../../components/A'
import * as Actions from './actions'
import css from './styles.css'

class PostsByAuthor extends Component {
  render() {
    return (
      <div>
        <AuthorPageHeader author={this.props.author} />
        <div className={css.posts}>
          {this.props.posts.map(x =>
            <Post key={x._id} { ...x } />
          )}
        </div>
      </div>
    )
  }
}

const AuthorPageHeader = ({ author }) => {
  if (!author.profile_img) {
    return null
  }
  return (
    <div className={css.profile}>
      <div className={css.av}>
        <img src={require(`images/${author.profile_img}`)} />
      </div>
      <div className={css.bio}>
        <div className={css.name}>{author.name}</div>
        {author.twitter
          ? <A
              className={css.social}
              pathname={author.twitter.url}>
              <span className="fa fa-twitter" />
            </A>
          : null
        }
      </div>
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    pathname: ownProps.location.pathname,
    query: ownProps.location.query,
    params: ownProps.location.params,
    loading: state.global.loading,
    author: state.global.author,
    meta: state.global.meta,
    posts: state.global.posts,
  }),
  Actions
)(PostsByAuthor)
