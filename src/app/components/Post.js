import React, { Component } from 'react';
import { Link } from 'react-router';
import { IntlProvider, FormattedRelative } from 'react-intl';
import classNames from 'classnames/bind';
import css from 'less/components/blog-post.less';

const cx = classNames.bind(css);

class Post extends Component {
  render() {
    const {
      timestamp, title, body,
      slug, image, author
    } = this.props;

    return (
      <div className={cx('post')}>
        <div className={cx('content')}>

          <div className={cx('header')}>
            <Link to={{ pathname: `/author/${author.username}` }}>
              <img className={cx('avatar')} src={require(`images/${author.avatar}`)} />
            </Link>
            <div className={cx('meta')}>
              <div className={cx('author')}>
                <Link to={{ pathname: `/author/${author.username}` }}>{author.name} <span className={cx('tag')}>Author</span></Link>
              </div>
              <IntlProvider locale="en">
                <div className={cx('timestamp')}>
                  <FormattedRelative value={timestamp} />
                </div>
              </IntlProvider>
            </div>
          </div>

          <Link to={{ pathname: `/post/${slug}` }}>
            <div className={cx('image')}  style={{ backgroundImage: `url(${image})` }}></div>
            <div className={cx('title')}>{title}</div>
          </Link>

          <div className={cx('body')}>{body}</div>
          <div className={cx('social')}>
            {author.social ? this.renderShareLinks() : null}
          </div>
        </div>
      </div>
    );
  }
  renderShareLinks() {
    const { username, share } = this.props.author;

    return (
      <div className={cx('author')}>
        <Link to={{ pathname: share.twitter }} target="_blank">{`${username} on Twitter`}</Link>
      </div>
    );
  }
}

export default Post;