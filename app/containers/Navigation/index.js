import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Header from '../../components/Header'
import ByDate from '../ByDate'
import ByAuthor from '../ByAuthor'
import SidePanel from '../../components/SidePanel'
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
      <div
        className={css.site}
        style={{ backgroundImage: `url(${Background})` }}>
        <Header />
        <div className={css.content}>
          <Match pattern="/" exactly component={ByDate} posts={this.props.posts} />
          <Match pattern="authors/:author" component={ByAuthor} />
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

