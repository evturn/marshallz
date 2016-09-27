import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Header from '../../components/Header'
import Landing from '../Landing'
import PostsByAuthor from '../PostsByAuthor'
import Pagination from '../../components/Pagination'
import * as Actions from './actions'
import Background from './bg.jpg'
import css from './styles.css'

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.fetch = ::this.fetch
  }

  componentWillMount() {
    const { pathname, query } = this.props
    const url = `/api${pathname}${query && query.page ? `?page=${query.page}` : ''}`
    this.props.fetchData(url)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, query } = nextProps
    const url = `/api${pathname}${query && query.page ? `?page=${query.page}` : ''}`
    if (this.props.url !== url) {
      this.fetch(url)
    }
  }

  fetch(url) {
    this.props.fetchData(url)
  }

  render() {
    return (
      <div className={css.site}>
        <Header />
        <div
          className={css.content}
          style={{ backgroundImage: `url(${Background})` }}>
          <Match pattern="/" exactly component={Landing} />
          <Match pattern="authors/:author" component={PostsByAuthor} />
          <Pagination
            pathname={this.props.pathname}
            meta={this.props.meta}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      url: state.global.url,
      pathname: ownProps.location.pathname,
      query: ownProps.location.query,
      loading: state.global.loading,
      error: state.global.error,
      posts: state.global.posts,
      authors: state.global.authors,
      author: state.global.author,
      meta: state.global.meta,
    }
  },
  Actions
)(Navigation)

