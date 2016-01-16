import React, { PropTypes } from 'react';
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
        </nav>
      </header>
    );
  }
}