import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { filterPosts } from 'actions'
import Posts from 'components/Posts'
import Pagination from 'components/Pagination'
import SidePanel from 'components/SidePanel'
import classNames from 'classnames/bind'
import css from 'less/components/home.less'

const cx = classNames.bind(css)

class Home extends Component {
  getChildContext() {
    return { params: this.props.params }
  }

  componentDidMount() {
    const { params, location, filter } = this.props

    filterPosts({ params, query: location.query, filter })(this.context.store)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params
      || nextProps.location.query !== this.props.location.query) {
      const { params, location } = nextProps
      const { filter } = this.props

      filterPosts({ params, query: location.query, filter })(this.context.store)
    }
  }

  render() {
    const { authors, showing, pathname } = this.props

    return (
      <div className={cx('root')}>
        {this.props.children}
        <Pagination pathname={pathname} />
        <div className={cx('main')}>
          <Posts posts={showing} />
          <SidePanel authors={authors} />
        </div>
        <Pagination pathname={pathname} stats={true} />
      </div>
    )
  }
}

Home.propTypes = {
  authors: PropTypes.array,
  filter: PropTypes.object,
  showing: PropTypes.array,
  params: PropTypes.object,
  query: PropTypes.object,
  pathname: PropTypes.string
}

Home.contextTypes = {
  store: PropTypes.object
}

Home.childContextTypes = {
  params: PropTypes.object
}

export default connect(
  (state, ownProps) => ({
    authors: state.blog.authors,
    filter: state.blog.filter,
    showing: state.blog.showing,
    params: ownProps.params,
    query: ownProps.location.query,
    pathname: ownProps.location.pathname
  })
)(Home)