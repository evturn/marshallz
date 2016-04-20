import React, { Component } from 'react'
import { Link } from 'react-router'
import { IntlProvider, FormattedRelative } from 'react-intl'
import classNames from 'classnames/bind'
import css from 'less/components/blog-post.less'

const cx = classNames.bind(css)

class Post extends Component {
  render() {
    const {
      timestamp, title, body, slug, image } = this.props
    const {
      username, avatar, name, social, share } = this.props.author

    const authorAvatar = (
      <Link to={{ pathname: `/author/${username}` }}>
        <img  src={require(`images/${avatar}`)} />
      </Link>)

    const authorTag = <span className={cx('tag')}>Author</span>

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
      </Link>
    ) : null

    const postImage = image ? <div className={cx('bg')}  style={{ backgroundImage: `url(${image})` }}></div> : null

    const postBody = <div className={cx('body')}>{body}</div>

    return (
      <div className={cx('post')}>
        <div className={cx('content')}>

          <div className={cx('header')}>
            <div className={cx('avatar')}>
              {authorAvatar}
            </div>
            <div className={cx('info')}>
              {authorName}
              {authorTwitter}
              {authorTag}
              {postTimestamp}
            </div>
          </div>

          {postTitle}
          {postImage}
          {postBody}
        </div>
      </div>
    )
  }
}

export default Post