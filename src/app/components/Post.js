import React, { Component } from 'react';
import { Link } from 'react-router';
import { IntlProvider, FormattedRelative } from 'react-intl';
import classNames from 'classnames/bind';
import css from 'less/components/blog-post.less';

const cx = classNames.bind(css);

class Post extends Component {
  render() {
    const {
      timestamp, title, body, slug, image } = this.props;
    const {
      username, avatar, name, social, share } = this.props.author;

    const authorAvatar = (
      <Link to={{ pathname: `/author/${username}` }}>
        <img className={cx('avatar')} src={require(`images/${avatar}`)} />
      </Link>
    );

    const postDetails = (
      <div className={cx('meta')}>
        <div className={cx('author')}>
          <Link to={{ pathname: `/author/${username}` }}>{name} <span className={cx('tag')}>Author</span></Link>
        </div>
        <IntlProvider locale="en">
          <div className={cx('timestamp')}>
            <FormattedRelative value={timestamp} />
          </div>
        </IntlProvider>
      </div>
    );

    const postTitle = (
      <Link to={{ pathname: `/post/${slug}` }}>
        <div className={cx('title')}>{title}</div>
      </Link>
    );

    const authorTwitter = (
      <div className={cx('social')}>
        {social ? (
          <div className={cx('author')}>
            <Link to={{ pathname: share.twitter }} target="_blank">{`${username} on Twitter`}</Link>
          </div>
        ) : null}
      </div>
    );

    return (
      <div className={cx('post')}>
        <div className={cx('content')}>
          <div className={cx('header')}>
            {authorAvatar}
            {postDetails}
          </div>
          {postTitle}
          <div className={cx('image')}  style={{ backgroundImage: `url(${image})` }}></div>
          <div className={cx('body')}>{body}</div>
          {authorTwitter}
        </div>
      </div>
    );
  }
}

export default Post;