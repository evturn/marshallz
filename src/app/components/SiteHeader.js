import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import css from 'less/components/header.less';

const cx = classNames.bind(css);

class SiteHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header style={{ backgroundImage: `url(${require('images/headbg.jpg')})` }} className={cx('site-header')}>
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