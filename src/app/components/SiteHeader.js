import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'assets/scss/layout/_header';
import bg from 'assets/images/headbg.jpg';

const cx = classNames.bind(styles);

class SiteHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header style={{ backgroundImage: `url(${bg})` }} className={cx('site-header')}>
        <nav className={cx('site-nav')}>
          <h1 className={cx('site-nav__header')}><a href="/">Marshallz Blog</a></h1>
          <h3 className={cx('site-nav__subhead')}>Welcome! And more importantly, Welcome to Marshallz Blog!</h3>
          <div className={cx('site-nav__mobile')}>
            <div><span className={cx('fa fa-bars')}></span></div>
          </div>
        </nav>
      </header>
    );
  }
}

export default SiteHeader;