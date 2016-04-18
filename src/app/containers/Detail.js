import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from 'components/Post';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Detail extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className={cx('blog-posts')}>
        <Post {...post} />
      </div>
    );
  }
}

Detail.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Detail);