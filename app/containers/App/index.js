import React, { Component } from 'react'
import Header from '../../components/Header'

import request from '../../utils/request'
import Post from '../Post'

import Background from './bg.jpg'
import 'sanitize.css/sanitize.css'
import css from './styles.css'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.fetch('/api')
  }

  fetch(url) {
    request(url)
      .then(::this.fetchSuccess)
  }

  fetchSuccess(posts) {
    this.setState({ posts })
  }

  render() {
    return (
      <div className={css.site}>
        <Header />
        <div
          className={css.content}
          style={{ backgroundImage: `url(${Background})` }}>
          {this.state.posts
            ? <div className={css.posts}>
                {this.state.posts.map(x => <Post key={x._id} { ...x } />)}
              </div>
            : null
          }
          {this.props.children}
        </div>
      </div>
    )
  }
}
