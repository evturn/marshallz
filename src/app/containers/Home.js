import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { transitionToHome, unmount } from '../actions';
import Posts from '../components/Posts';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    transitionToHome(dispatch);
  }
  componentWillUnmount() {
    const { dispatch } = this.props;

    unmount(dispatch);
  }
  render() {
    return (
      <Posts
        posts={this.props.posts}
        isFetching={this.props.isFetching}
      />
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

function mapStateToProps(state) {
  return {
    detail: state.data.detail,
    author: state.data.author,
    posts: state.data.posts,
    authors: state.data.authors,
    isFetching: state.data.isFetching,
    done: state.data.done
  };
}

export default connect(mapStateToProps)(Home);