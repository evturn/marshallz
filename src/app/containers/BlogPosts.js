import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterPosts } from 'actions';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class BlogPosts extends Component {
  componentWillMount() {
    const { dispatch, params, query, filter } = this.props;

    dispatch(filterPosts({ params, query, filter }));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, filter } = this.props;

    if (nextProps.params !== this.props.params || nextProps.query !== this.props.query) {
      const { params, query } = nextProps;

      dispatch(filterPosts({ params, query, filter }));
    }
  }
  render() {
    const { showing, pagination, pathname } = this.props;

    return (
      <div className={cx('posts')}>{showing.map((post, i) =>
        <Post key={i} {...post} />
      )}
        <Pagination pathname={pathname} {...pagination} />
      </div>
    );
  }
}

BlogPosts.propTypes = {
  showing: PropTypes.array,
  pagination: PropTypes.object,
  filter: PropTypes.object,
  params: PropTypes.object,
  query: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  (state, ownProps) => ({
    routing: state.routing,
    params: ownProps.params,
    query: ownProps.location.query,
    pathname: ownProps.location.pathname,
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    filter: state.blog.filter
  })
)(BlogPosts);