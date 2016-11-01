import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Header from 'components/Header'
import ByDate from 'containers/ByDate'
import ByAuthor from 'containers/ByAuthor'
import SidePanel from 'components/SidePanel'
import Pagination from 'components/Pagination'
import * as Actions from 'api/actions'
import Background from './bg.jpg'
import css from './styles.css'

class Navigation extends Component {
  componentWillMount() {
    this.props.fetchInitialData()
  }

  render() {
    return (
      <div className={css.site} style={{ backgroundImage: `url(${Background})` }}>
        <Header />
        <div className={css.content}>
          <Match pattern="/" exactly component={ByDate} />
          <Match pattern="/authors/:author" component={ByAuthor} />
          <Match pattern="/posts/:slug" component={ByAuthor} />
          <SidePanel authors={this.props.authors} />
        </div>

        {this.props.pagination
          ? <Pagination pathname={this.props.pathname} meta={this.props.meta} />
          : null
        }
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      url: ownProps.url,
      pathname: ownProps.location.pathname,
      query: ownProps.location.query,
      // pagination: !state.routing.params || !state.routing.params.slug,
      loading: state.loading,
      error: state.error,
      posts: state.posts,
      authors: state.authors,
      author: state.author,
      meta: state.meta,
    }
  },
  Actions
)(Navigation)
