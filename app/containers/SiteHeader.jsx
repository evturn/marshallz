import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/layout/_header';
import bg from 'images/headbg.jpg';

const cx = classNames.bind(styles);

export default class SiteHeader extends React.Component {
  constructor(props) {
    super(props);

    this.bg = { backgroundImage: `url(${bg})` };
  }
  render() {
    return (
      <header style={this.bg} className={cx('site-header')}>
        <nav className={cx('site-nav')}>
          <h1 className={cx('site-nav__header')}><a href="/">Marshallz Blog</a></h1>
          <h3 className={cx('site-nav__subhead')}>Welcome! And more importantly, Welcome to Marshallz Blog!</h3>
          <div className={cx('site-nav__mobile')}>
            <div><span className={cx('fa fa-bars')}></span></div>
          </div>
          <div className={cx('site-nav__menu')}>
            <div className={cx('site-nav__authors')}>
              <ul className={cx('site-nav__author')}>
                <li className={cx('site-nav__author-item')}>Marshall <span className={cx('fa fa-chevron-down')}></span></li>
                <li className={cx('site-nav__sublist js-menu')}>
                  <ul>
                    <li className={cx('site-nav__author-item site-nav__sublist-item')}><a href="marshallz.com">Posts</a></li>
                    <li className={cx('site-nav__author-item site-nav__sublist-item')}><a href="https://twitter.com/marshallzBlog" target="_blank">Twitter</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}