import React, { Component } from 'react';
import Post from 'components/Post';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Posts extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { posts } = this.props;

    return (
      <div className={cx('blog-posts')}>{posts.map((post, i) =>
        <Post key={i} {...post} />
      )}</div>
    );
  }
}

export default Posts;