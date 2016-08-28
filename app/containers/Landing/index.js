import React, { Component } from 'react'
import request from '../../utils/request'
import Post from '../Post'
import A from '../../components/A'
import css from './styles.css'

export default class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      authors: [],
    }
  }

  componentDidMount() {
    this.fetch('/api')
  }

  fetch(url) {
    request(url)
      .then(::this.fetchSuccess)
  }

  fetchSuccess(data) {
    this.setState({
      posts: data.posts,
      authors: data.authors,
    })
  }
  render() {
    return (
      <div>
        <Posts posts={this.state.posts} />
        <SidePanel authors={this.state.authors} />
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

