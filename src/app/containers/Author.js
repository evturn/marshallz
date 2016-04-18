import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Posts from 'components/Posts';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Author extends Component {
  render() {
    const { posts, author } = this.props;
    return (
      <Posts posts={posts} />
    );
  }
}

Author.propTypes = {
  author: PropTypes.object,
  posts: PropTypes.array,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    author: state.data.author.author,
    posts: state.data.author.posts,
    isFetching: state.data.isFetching
  })
)(Author);