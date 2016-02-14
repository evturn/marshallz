import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import classNames from 'classnames/bind';
import styles from 'scss/components/_blog-posts';

const cx = classNames.bind(styles);

class Blog extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={cx('blog-posts')}>{this.props.posts.map((blogPost, i) =>
        <Post key={i} {...blogPost} />
      )}</div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.array,
  bots: PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    bots: state.bot.bots
  };
}

export default connect(mapStateToProps)(Blog);