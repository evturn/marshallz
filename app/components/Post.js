import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-post';
import { IntlProvider, FormattedRelative } from 'react-intl';
const cx = classNames.bind(styles);

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={cx('post-item')}>
        <div className={cx('post-item__content')}>

          <div className={cx('post-item__header')}>
            <Link to={{ pathname: `/author/${this.props.bot.username}` }}><img className={cx('post-item__avatar')} src={`/img/${this.props.bot.avatar}`} /></Link>
            <div className={cx('post-item__content-meta')}>
              <div className={cx('post-item__content-author')}>
                <Link to={{ pathname: `/author/${this.props.bot.username}` }}>{this.props.bot.name} <span className={cx('post-item__author-tag')}>Author</span></Link>
              </div>
              <IntlProvider locale="en">
                <div className={cx('post-item__content-timestamp')}>
                  <FormattedRelative value={this.props.timestamp} />
                </div>
              </IntlProvider>
            </div>
          </div>

          <Link to={{ pathname: `/post/${this.props.slug}` }}>
            <div className={cx('post-item__content-image')}  style={{ backgroundImage: `url(${this.props.image})` }}></div>
            <div className={cx('post-item__content-title')}>{this.props.title}</div>
          </Link>

          <div className={cx('post-item__content-body')}>{this.props.body}</div>
          <div className={cx('post-item__content-social')}>
            {this.renderShareLinks()}
          </div>
        </div>
      </div>
    );
  }
  renderShareLinks() {
    if (this.props.bot.social) {
      return (
        <div className={cx('post-item__content-author')}>
          <Link to={{ pathname: this.props.bot.share.twitter }} target="_blank">{this.props.bot.username} on Twitter</Link>
        </div>
      );
    }
  }
}

export default Post;