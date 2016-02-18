import React, { Component } from 'react';
import Post from '../components/Post';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';

const cx = classNames.bind(styles);

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