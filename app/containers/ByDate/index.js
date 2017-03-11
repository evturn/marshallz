import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import Post from 'containers/Post'
import LoadingIndicator from 'components/LoadingIndicator'
import * as Actions from 'api/actions'
import css from './styles.css'

@connect(state => ({
  posts: state.posts,
  loading: state.loading,
}), Actions)

class ByDate extends Component {
  constructor(props) {
    super(props)
    this.fetch = ::this.fetch
  }

  componentDidMount() {
    const { query } = this.props.location
    this.fetch(query)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, location } = nextProps
    if (this.props.pathname !== pathname) {
      this.fetch(location.query)
    }
  }

  fetch(query) {
    this.props.fetchByDate({ query })
  }

  render() {
    const { loading, posts } = this.props
    return (
      <div className={css.posts}>
        {loading
          ? <LoadingIndicator />
          : <div>
              {posts.map((x, i) => <Post {...x} key={i} />)}
            </div>
        }
      </div>
    )
  }
}

export default ByDate
