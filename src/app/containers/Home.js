import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Posts from 'components/Posts'
import Pagination from 'components/Pagination'
import Authors from 'components/Authors'
import classNames from 'classnames/bind'
import css from 'less/components/home.less'

const cx = classNames.bind(css)

class Home extends Component {
  render() {
    const { authors, showing, location } = this.props

    return (
      <div className={cx('root')}>
        {this.props.children}
        <Pagination pathname={location.pathname} />
        <div className={cx('main')}>
          <Posts posts={showing} />
          <Authors authors={authors} />
        </div>
        <Pagination pathname={location.pathname} stats={true} />
      </div>
    )
  }
}

Home.propTypes = {
  authors: PropTypes.array,
  showing: PropTypes.array
}

export default connect(
  state => ({
    authors: state.blog.authors,
    showing: state.blog.showing
  })
)(Home)