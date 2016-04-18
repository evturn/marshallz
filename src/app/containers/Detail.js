import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { transitionToDetail } from 'actions';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Detail extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;

    transitionToDetail(params.slug, dispatch);
  }
  render() {
    const { isFetching, post, done } = this.props;

    return (
      <div className={cx('blog-posts')}>
        <Post {...post} />
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

export default connect(
  state => ({
    post: state.data.detail.post,
    author: state.data.detail.author,
    isFetching: state.data.isFetching,
    done: state.data.done
  })
)(Detail);