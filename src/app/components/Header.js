import React from 'react'
import classNames from 'classnames/bind'
import css from 'less/components/header.less'

const cx = classNames.bind(css)

export default () => {
  return (
    <header className={cx('root')} style={{ backgroundImage: `url(${require('images/headbg.jpg')})` }} >
      <div className={cx('nav')}>
        <h1 className={cx('title')}><a href="/">Marshallz Blog</a></h1>
        <div className={cx('caption')}>Welcome! And more importantly, Welcome to Marshallz Blog!</div>
      </div>
    </header>
  )
}