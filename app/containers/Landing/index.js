import React, { Component } from 'react'
import withFetch from '../Fetch'
import Post from '../Post'
import A from '../../components/A'
import Pagination from '../../components/Pagination'
import css from './styles.css'

class Landing extends Component {
  render() {
    return (
      <div>
        <div className={css.landing}>
          <Posts posts={this.props.posts} />
          <SidePanel authors={this.props.authors} />
        </div>
        <Pagination
          pathname={this.props.pathname}
          meta={this.props.meta}
        />
      </div>
    )
  }
}

const Posts = ({ posts }) => (
  <div className={css.posts}>
    {posts.map(x => {
      return <Post key={x._id} { ...x } />
    })}
  </div>
)

const SidePanel = ({ authors }) => {
  return (
    <div className={css.root}>
      <ul>
        <li className={css.title}>Writers</li>
        {authors.map(x =>(
          <li key={x._id}>
            <A
              className={css.sidelink}
              pathname={x.blog.url}>
              <img src={x.profile_img} />
              <span className={css.name}>{x.name}</span>
            </A>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withFetch(Landing)
