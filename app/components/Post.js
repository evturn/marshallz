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
            <Link to="/"><img className={cx('post-item__avatar')} src={`${this.props.bot.avatar}`} /></Link>
            <div className={cx('post-item__content-meta')}>
              <div className={cx('post-item__content-author')}>
                <Link to="/">{this.props.bot.name} <span className={cx('post-item__author-tag')}>Author</span></Link>
              </div>
              <IntlProvider locale="en">
                <div className={cx('post-item__content-timestamp')}>
                  <FormattedRelative value={this.props.timestamp} />
                </div>
              </IntlProvider>
            </div>
          </div>

          <Link to={`/post/${this.props.slug}`}>
            <div className={cx('post-item__content-image')}  style={{ backgroundImage: `url(${this.props.image})` }}></div>
            <div className={cx('post-item__content-title')}>{this.props.title}</div>
          </Link>

          <div className={cx('post-item__content-body')}>{this.props.body}</div>
          <div className={cx('post-item__content-social')}>
            <div className={cx('post-item__content-author')}>
              <Link to={this.props.bot.social.twitter} target="_blank">{this.props.bot.username} on Twitter</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;