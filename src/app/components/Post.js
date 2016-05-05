import React, { Component } from 'react'
import { Link } from 'react-router'
import { IntlProvider, FormattedRelative } from 'react-intl'
import classNames from 'classnames/bind'
import css from 'less/components/post.less'

const cx = classNames.bind(css)

export default props => {
  const { timestamp, title, body, slug, image, author } = props
  const { username, avatar, name, social, share } = author

  const authorAvatar = (
    <Link to={{ pathname: `/author/${username}` }}>
      <img src={require(`images/${avatar}`)} />
    </Link>)

  const authorName = (
    <span className={cx('name')}>
      <Link to={{ pathname: `/author/${username}` }}>{name}</Link>
    </span>)

  const postTimestamp = (
    <IntlProvider locale="en">
      <div className={cx('date')}>
        <FormattedRelative value={timestamp} />
      </div>
    </IntlProvider>)

  const postTitle = (
    <div className={cx('title')}>
      <Link to={{ pathname: `/post/${slug}` }}>{title}</Link>
    </div>)

  const authorTwitter = social ? (
    <Link className={cx('social')} to={{ pathname: share.twitter }} target="_blank">
      <span className="fa fa-twitter" />
    </Link>) : null

  const bgImg = { backgroundImage: `url(${image})` }
  const postImage = <div className={cx('bg')}  style={bgImg}></div>

  return (
    <div className={cx('post')}>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <div className={cx('avatar')}>
            {authorAvatar}
          </div>
          <div className={cx('info')}>
            <div className={cx('links')}>
              {authorName}
              {authorTwitter}
            </div>
            <div className={cx('meta')}>
              <span className={cx('tag')}>Author</span>
              {postTimestamp}
            </div>
          </div>
        </div>
        {postTitle}
        {image ? postImage : null}
        <div className={cx('body')}>{body}</div>
      </div>
    </div>
  )
}