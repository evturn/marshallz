import React, { Component } from 'react'
import withFetch from '../Fetch'
import Post from '../Post'
import A from '../../components/A'
import Pagination from '../../components/Pagination'
import css from './styles.css'

class PostsByAuthor extends Component {
  render() {
    return (
      <div>
        <AuthorPageHeader author={this.props.author} />
        <Pagination
          pathname={this.props.pathname}
          meta={this.props.meta}
        />
        <AuthorPosts posts={this.props.posts} />
        <Pagination
          pathname={this.props.pathname}
          meta={this.props.meta}
        />
      </div>
    )
  }
}

const AuthorPageHeader = ({ author }) => {
  return (
    <div className={css.profile}>
      <div className={css.av}>
        <img src={author.profile_img} />
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

const AuthorPosts = ({ posts }) => (
  <div className={css.posts}>
    {posts.map(x => {
      return <Post key={x._id} { ...x } />
    })}
  </div>
)

export default withFetch(PostsByAuthor)
