import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';

const cx = classNames.bind(styles);

class Home extends Component {
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

Home.propTypes = {
  posts: PropTypes.array,
  authors: PropTypes.array,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    authors: state.author.authors,
    isFetching: state.blog.isFetching
  };
}

export default connect(mapStateToProps)(Home);