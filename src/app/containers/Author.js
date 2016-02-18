import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import Posts from '../components/Posts';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';
import { transitionToAuthor, unmount } from '../actions';

const cx = classNames.bind(styles);

class Author extends Component {
  constructor(props) {
    super(props);
  }
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

function mapStateToProps(state) {
  return {
    author: state.data.author.author,
    posts: state.data.author.posts,
    authors: state.data.authors,
    isFetching: state.data.isFetching,
    done: state.data.done
  };
}

export default connect(mapStateToProps)(Author);