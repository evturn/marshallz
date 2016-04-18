import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Posts from 'components/Posts';
import { transitionToHome } from 'actions';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(transitionToHome);
  }
  render() {
    const { posts, isFetching } = this.props;

    return (
      <Posts posts={posts} isFetching={isFetching} />
    );
  }
}

Home.propTypes = {
  posts: PropTypes.array,
  authors: PropTypes.array,
  detail: PropTypes.object,
  author: PropTypes.object,
  isFetching: PropTypes.bool,
  done: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    detail: state.data.detail,
    author: state.data.author,
    posts: state.data.posts,
    authors: state.data.authors,
    isFetching: state.data.isFetching,
    done: state.data.done
  })
)(Home);