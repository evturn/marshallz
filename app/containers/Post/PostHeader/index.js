import React from 'react'
import Link from 'react-router/Link'
import Timestamp from 'components/Timestamp'
import Avatar from 'components/Avatar'
import css from './style.css'

export const PostHeader = ({ author, timestamp }) => {
  return (
    <div className={css.root}>
      <Link className={css.avatar} to={author.blog.url}>
        <Avatar className={css.img} src={author.avatar_img} />
      </Link>
      <div className={css.info}>
        <span className={css.name}>
          <Link to={author.blog.url}>{author.name}</Link>
        </span>
        {author.twitter
          ? <a className={css.social} href={author.twitter.url} target="_blank">
              <span className="fa fa-twitter" />
            </a>
          : null
        }
        <span className={css.tag}>Author</span>
        <Timestamp className={css.date} value={timestamp} />
      </div>
    </div>
  )
}

export default PostHeader
