import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { filterPosts } from 'actions'
import Post from 'components/Post'
import Pagination from 'components/Pagination'
import Profile from 'components/Profile'
import SidePanel from 'components/SidePanel'
import classNames from 'classnames/bind'
import css from 'less/components/blog-posts.less'

const cx = classNames.bind(css)

class BlogPosts extends Component {
  componentDidMount() {
    const { params, query, filter } = this.props

    filterPosts({ params, query, filter })(this.context.store)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params
      || nextProps.query !== this.props.query) {
      const { params, query } = nextProps
      const { filter } = this.props

      filterPosts({ params, query, filter })(this.context.store)
    }
  }

  render() {
    const {
      showing, pagination, pathname,
      authors, query, params } = this.props
    return (
      <div className={cx('root')}>
        {params.author ? <Profile username={params.author} /> : null}
        <Pagination pathname={pathname} />
        <div className={cx('posts')}>
          {showing.map((x, i) => <Post key={i} { ...x } />)}
          <Pagination stats={true} pathname={pathname} />
        </div>
        <SidePanel authors={authors} />
      </div>
    )
  }
}

BlogPosts.propTypes = {
  authors: PropTypes.array,
  showing: PropTypes.array,
  filter: PropTypes.object,
  params: PropTypes.object,
  query: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

BlogPosts.contextTypes = {
  store: PropTypes.object
}

export default connect(
  (state, ownProps) => ({
    routing: state.routing,
    authors: state.blog.authors,
    params: ownProps.params,
    query: ownProps.location.query,
    pathname: ownProps.location.pathname,
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    filter: state.blog.filter
  })
)(BlogPosts)