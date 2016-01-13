import React, { Component, PropTypes } from 'react';
import BlogPost from '../components/BlogPost';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'scss/components/_blog-posts';

const cx = classNames.bind(styles);

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.blogPosts = props.blogPosts;
  }
  render() {

    return (
      <div>
        <div className={cx('blog-posts')}>{this.blogPosts.map((blogPost, i) =>
          <BlogPost key={i} {...blogPost} />
        )}</div>
      </div>
    );
  }
}

Blog.propTypes = {
  blogPosts: PropTypes.array,
  marshall: PropTypes.object,
  clang: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    blogPosts: state.blogPost.blogPosts,
    marshall: state.bot.marshall,
    clang: state.bot.clang
  };
}

export default connect(mapStateToProps)(Blog);