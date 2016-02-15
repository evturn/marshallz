import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getBlogPost } from '../actions/blog'
import Post from '../components/Post';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-posts';

const cx = classNames.bind(styles);

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(getBlogPost(params.slug, dispatch));
  }
  render() {
    const { isFetching, post } = this.props;
    const content = post !== null ? <Post {...post} /> : <div />;

    return (
      <div className={cx('blog-posts')}>
        {content}
      </div>
    )
  }
}

Detail.propTypes = {
  post: PropTypes.object,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    post: state.blog.post,
    isFetching: state.blog.isFetching
  };
}

export default connect(mapStateToProps)(Detail);