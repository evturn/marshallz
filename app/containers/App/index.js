import React, { Component } from 'react'
import { BrowserRouter, Match } from 'react-router'
import store from 'redux-connect-decorator'
import Header from 'components/Header'
import PostContent from 'containers/Post/PostContent'
import PostHeader from 'containers/Post/PostHeader'
import SidePanel from 'components/SidePanel'
import { fetchByDate, fetchInitialData } from 'api/actions'
import 'sanitize.css/sanitize.css'
import bg from 'containers/App/bg.jpg'
import css from 'containers/App/style.css'

@store(state => ({
  authors: state.authors,
  loading: state.loading,
  posts: state.posts,
}), {
  fetchByDate,
  fetchInitialData,
})

class App extends Component {
  static defaultProps = {
    posts: [],
  }

  componentWillMount() {
    this.props.fetchInitialData()
    this.props.fetchByDate()
  }

  render() {
    return (
      <BrowserRouter>
        <div
          className={css.root}
          style={{backgroundImage: `url(${bg})`}}>
          <Header />
          <div className={css.content}>
            <Match
              exactly
              pattern="/"
              render={props =>
                <Posts posts={this.props.posts}>
                  <SidePanel authors={this.props.authors} />
                </Posts>
              } />
            <Match
              pattern="/post/:slug"
              render={props =>
                <Post post={this.props.posts.find(x => x.slug === props.params.slug)} />
              } />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const Posts = ({ children, posts }) => {
  return (
    <div>
      <div className={css.posts}>
        {posts.map(x =>
          <div
            className={css.item}
            key={x.timestamp}>
            <PostHeader {...x} />
            <PostContent {...x} />
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

const Post = ({ post }) => {
  return (
    <div
      className={css.item}
      key={post.timestamp}>
      <PostHeader {...post} />
      <PostContent {...post} />
    </div>
  )
}

export default App