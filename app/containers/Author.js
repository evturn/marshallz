import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';
import { navigateToAuthor } from '../actions/bot';

const cx = classNames.bind(styles);

class Author extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { params, bots, dispatch } = this.props;

    navigateToAuthor(dispatch, params.username, bots);
  }
  render() {
    const { posts } = this.props;

    if (posts === undefined || posts === null) {
      return <div />;
    } else if (posts !== null){
      return (
        <div className={cx('blog-posts')}>{this.props.posts.map((blogPost, i) =>
          <Post key={i} {...blogPost} />
        )}</div>
      );
    }
  }
}

Author.propTypes = {
  author: PropTypes.object,
  posts: PropTypes.array,
  bots: PropTypes.array,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    author: state.bot.author,
    posts: state.bot.posts,
    bots: state.bot.bots,
    isFetching: state.blog.isFetching
  };
}

export default connect(mapStateToProps)(Author);