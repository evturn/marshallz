import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';
import { navigateToAuthor } from '../actions/author';

const cx = classNames.bind(styles);

class Author extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { params, authors, dispatch } = this.props;

    navigateToAuthor(dispatch, params.username, authors);
  }
  render() {
    const { posts } = this.props;

    if (posts === undefined || posts === null) {
      return <div />;
    } else if (posts !== null){
      return (
        <div className={cx('blog-posts')}>{posts.map((blogPost, i) =>
          <Post key={i} {...blogPost} />
        )}</div>
      );
    }
  }
}

Author.propTypes = {
  authors: PropTypes.array,
  author: PropTypes.object,
  posts: PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    authors: state.author.authors,
    author: state.author.author,
    posts: state.author.posts
  };
}

export default connect(mapStateToProps)(Author);