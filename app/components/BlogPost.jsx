import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_blog-post';
import avatarClang from 'images/av-clang.png';
import avatarMarshall from 'images/av-marshall.png';
import icons from 'scss/lib/font-awesome/font-awesome.scss';
const cx = classNames.bind(styles);
const ico = classNames.bind(icons);


export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.avatar = { backgroundImage: `url(${avatarClang})` };
    this.image = { backgroundImage: `url(${props.image})` };
  }
  render() {
    return (
      <div className={cx('post-item')}>
        <div className={cx('post-item__content')}>
          <div className={cx('post-item__header')}>
            <a href="marshallz.com"><div className={cx('post-item__avatar')} style={this.avatar}></div></a>
            <div className={cx('post-item__content-meta')}>
              <div className={cx('post-item__content-author')}>
                <a href="marshallz.com">{this.props.username} </a>
                <span className={cx('post-item__author-tag')}>Author</span>
              </div>
              <div className={cx('post-item__content-timestamp')}>A few minutes ago</div>
            </div>
          </div>
          <a href="marshallz.com">
            <div className={cx('post-item__content-image')}  style={this.image}></div>
            <div className={cx('post-item__content-title')}>{this.props.title}</div>
          </a>
          <div className={cx('post-item__content-body')}>{this.props.body}</div>
          <div className={cx('post-item__content-social')}>
            <div className={cx('post-item__content-author')}>
              <a href="marshallz.com" target="_blank">{this.props.username} on <span className={ico('fa', 'fa-twitter')}></span></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlogPost.propTypes = {
  avatar: PropTypes.string,
  image: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string
};
