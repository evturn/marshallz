import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'actions';
import Post from 'components/Post';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Detail extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(fetchPost(params.post));
  }
  render() {
    const { hasOne, post} = this.props;
    console.log(post);
    return (
      <div className={cx('blog-posts')}>
        {hasOne ? <Post {...post}/> : null}
      </div>
    );
  }
}

Detail.propTypes = {
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    post: state.blog.post,
    hasOne: state.blog.hasOne
  })
)(Detail);