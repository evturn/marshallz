import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'components/Spinner';
import Posts from 'components/Posts';
import { transitionToAuthor, unmount } from 'actions';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Author extends Component {
  componentDidMount() {
    const { params, authors, dispatch } = this.props;
    const [ author ] = authors.filter(author => author.username === params.username);

    transitionToAuthor(author, dispatch);
  }
  componentWillUnmount() {
    const { dispatch } = this.props;

    unmount(dispatch);
  }
  render() {
    const { isFetching, posts, author, done } = this.props;

    if (posts !== null) {
      console.log('AUTHOR POSTS: ', posts);
      return <Posts posts={posts} />;
    } else {
      return <Spinner isFetching={isFetching} done={done} image={`/img/av-marshall.png`} />;
    }
  }
}

Author.propTypes = {
  author: PropTypes.object,
  posts: PropTypes.array,
  authors: PropTypes.array,
  isFetching: PropTypes.bool,
  done: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    author: state.data.author.author,
    posts: state.data.author.posts,
    authors: state.data.authors,
    isFetching: state.data.isFetching,
    done: state.data.done
  })
)(Author);