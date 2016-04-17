import React, { Component } from 'react';
import { Link } from 'react-router';
import { IntlProvider, FormattedRelative } from 'react-intl';
import classNames from 'classnames/bind';
import css from 'less/components/blog-post.less';

const cx = classNames.bind(css);

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      timestamp, title, body,
      slug, image, author
    } = this.props;

    return (
      <div className={cx('post-item')}>
        <div className={cx('post-item__content')}>

          <div className={cx('post-item__header')}>
            <Link to={{ pathname: `/author/${author.username}` }}>
              <img className={cx('post-item__avatar')} src={require(`images/${author.avatar}`)} />
            </Link>
            <div className={cx('post-item__content-meta')}>
              <div className={cx('post-item__content-author')}>
                <Link to={{ pathname: `/author/${author.username}` }}>{author.name} <span className={cx('post-item__author-tag')}>Author</span></Link>
              </div>
              <IntlProvider locale="en">
                <div className={cx('post-item__content-timestamp')}>
                  <FormattedRelative value={timestamp} />
                </div>
              </IntlProvider>
            </div>
          </div>

          <Link to={{ pathname: `/post/${slug}` }}>
            <div className={cx('post-item__content-image')}  style={{ backgroundImage: `url(${image})` }}></div>
            <div className={cx('post-item__content-title')}>{title}</div>
          </Link>

          <div className={cx('post-item__content-body')}>{body}</div>
          <div className={cx('post-item__content-social')}>
            {author.social ? this.renderShareLinks() : null}
          </div>
        </div>
      </div>
    );
  }
  renderShareLinks() {
    const { username, share } = this.props.author;

    return (
      <div className={cx('post-item__content-author')}>
        <Link to={{ pathname: share.twitter }} target="_blank">{`${username} on Twitter`}</Link>
      </div>
    );
  }
}

export default Post;