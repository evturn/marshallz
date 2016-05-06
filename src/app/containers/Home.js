import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Posts from 'components/Posts'
import Pagination from 'components/Pagination'
import Authors from 'components/Authors'
import { filterPosts } from 'actions'
import classNames from 'classnames/bind'
import css from 'less/components/home.less'

const cx = classNames.bind(css)

class Home extends Component {
  render() {
    const { authors, showing, pathname } = this.props

    return (
      <div className={cx('root')}>
        {this.props.children}
        <Pagination pathname={pathname} />
        <div className={cx('main')}>
          <Posts posts={showing} />
          <Authors authors={authors} />
        </div>
        <Pagination pathname={pathname} stats={true} />
      </div>
    )
  }
}

Home.propTypes = {
  authors: PropTypes.array,
  showing: PropTypes.array,
  query: PropTypes.object,
  params: PropTypes.object,
  pathname: PropTypes.string
}

export default connect(
  (state, ownProps) => ({
    authors: state.blog.authors,
    showing: state.blog.showing,
    query: ownProps.location.query,
    params: ownProps.params,
    pathname: ownProps.location.pathname
  })
)(Home)