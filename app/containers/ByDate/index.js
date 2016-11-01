import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from 'containers/Post'
import LoadingIndicator from 'components/LoadingIndicator'
import * as Actions from 'api/actions'
import css from './styles.css'

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
    return (
      <div className={css.posts}>

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

export default connect(state => ({ posts: state.global.posts }), Actions)(ByDate)
