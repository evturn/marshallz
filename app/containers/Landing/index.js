import React, { Component } from 'react'
import request from '../../utils/request'
import withFetch from '../Fetch'
import Post from '../Post'
import A from '../../components/A'
import css from './styles.css'

class Landing extends Component {
  render() {
    return (
      <div>
        <Posts posts={this.props.posts} />
        <SidePanel authors={this.props.authors} />
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
        {authors.map((x, i) =>(
          <li key={i}>
            <A pathname={`/author/${x.username}`}>
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
