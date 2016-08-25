import React from 'react'
import { Link } from 'react-router'
import { IntlProvider, FormattedRelative } from 'react-intl'

import borf from './av-borf.png'
import marshall from './av-marshall.png'
import clang from './av-clang.png'

import css from './styles.css'

export default props => {
  const { timestamp, title, body, slug, image, author } = props
  const { username, avatar, name, social, share } = author

  const authorAvatar = (
    <Link
      className={css.avatar}
      to={{ pathname: `/author/${username}` }}>
      <img src={clang} />
    </Link>)

  const authorName = (
    <span className={css.name}>
      <Link to={{ pathname: `/author/${username}` }}>{name}</Link>
    </span>)

  const postTimestamp = (
    <IntlProvider locale="en">
      <div className={css.date}>
        <FormattedRelative value={timestamp} />
      </div>
    </IntlProvider>)

  const postTitle = (
    <div className={css.title}>
      <Link to={{ pathname: `/post/${slug}` }}>{title}</Link>
    </div>)

  const authorTwitter = social ? (
    <Link className={css.title} to={{ pathname: share.twitter }} target="_blank">
      <span className="fa fa-twitter" />
    </Link>) : null

  const postImage = <div className={css.bg}  style={{ backgroundImage: `url(${image})` }} />

  return (
    <div className={css.post}>
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.header}>
            {authorAvatar}
          </div>
          <div className={css.info}>
            <div className={css.links}>
              {authorName}
              {authorTwitter}
            </div>
            <div className={css.meta}>
              <span className={css.tag}>Author</span>
              {postTimestamp}
            </div>
          </div>
        </div>
        {postTitle}
        {image ? postImage : null}
        <div className={css.body}>{body}</div>
      </div>
    </div>
  )
}
