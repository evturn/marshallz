import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { transitionToDetail, unmount } from '../actions';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';

const cx = classNames.bind(styles);

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

    transitionToDetail(params.slug, dispatch);
  }
  componentWillUnmount() {
    const { dispatch } = this.props;

    unmount(dispatch);
  }
  render() {
    const { isFetching, post, done } = this.props;

    return (
      <div className={cx('blog-posts')}>
        <Spinner isFetching={isFetching} done={done} image={`/img/av-marshall.png`} />
        {post === null ? null : <Post {...post} />}
      </div>
    );
  }
}

Detail.propTypes = {
  post: PropTypes.object,
  author: PropTypes.object,
  isFetching: PropTypes.bool,
  done: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    post: state.data.detail.post,
    author: state.data.detail.author,
    isFetching: state.data.isFetching,
    done: state.data.done
  };
}

export default connect(mapStateToProps)(Detail);