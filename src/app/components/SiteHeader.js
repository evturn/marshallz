import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import css from 'less/components/header.less'

const cx = classNames.bind(css)

class SiteHeader extends Component {
  render() {
    return (
      <header className={cx('root')} style={{ backgroundImage: `url(${require('images/headbg.jpg')})` }} >
        <nav className={cx('nav')}>
          <h1 className={cx('title')}><a href="/">Marshallz Blog</a></h1>
          <h3 className={cx('caption')}>Welcome! And more importantly, Welcome to Marshallz Blog!</h3>
        </nav>
      </header>
    )
  }
}

export default SiteHeader