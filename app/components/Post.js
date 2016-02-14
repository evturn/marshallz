import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_blog-post';
import mAvatar from 'assets/images/av-marshall.png';
import cAvatar from 'assets/images/av-clang.png';
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
            {this.renderAvatar()}
            <div className={cx('post-item__content-meta')}>
              <div className={cx('post-item__content-author')}>
                <a>{this.props.bot.username} </a>
                <span className={cx('post-item__author-tag')}>Author</span>
              </div>
              <IntlProvider locale="en">
                <div className={cx('post-item__content-timestamp')}><FormattedRelative value={this.props.timestamp}/></div>
              </IntlProvider>
            </div>
          </div>
          <a href="marshallz.com">
            <div className={cx('post-item__content-image')}  style={{ backgroundImage: `url(${this.props.image})` }}></div>
            <div className={cx('post-item__content-title')}>{this.props.title}</div>
          </a>
          <div className={cx('post-item__content-body')}>{this.props.body}</div>
          <div className={cx('post-item__content-social')}>
            <div className={cx('post-item__content-author')}>
              <a href={this.props.bot.social.twitter} target="_blank">{this.props.bot.username} on Twitter</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderAvatar() {
    const src = this.props.bot.username === 'marshall' ? mAvatar : cAvatar
    return <a href="marshallz.com"><img className={cx('post-item__avatar')} src={src} /></a>;
  }
}

export default Post;