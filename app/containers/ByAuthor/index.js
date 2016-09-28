import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Post'
import LoadingIndicator from '../../components/LoadingIndicator'
import A from '../../components/A'
import css from './styles.css'

class ByAuthor extends Component {
  render() {
    return (
      <div className={css.posts}>
        <AuthorPageHeader
          author={this.props.author}
          src={this.props.author.profile_img}
        />

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

const AuthorPageHeader = ({ author, src }) => {
  if (!author.profile_img) {
    return null
  }
  return (
    <div className={css.profile}>
      <div className={css.av}>
        <img src={require(`images/${src}`)} />
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
  state => ({
    author: state.global.author,
    posts: state.global.posts,
  })
)(ByAuthor)
