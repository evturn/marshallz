import React from 'react'
import Link from 'react-router/Link'
import Img from 'components/Img'
import css from './style.css'

export const PostContent = ({ title, slug, body, image_url }) => {
  return (
    <div>
      <div className={css.title}>
        <Link to={`/post/${slug}`}>{title}</Link>
      </div>
      <div className={css.media}>
        <Img className={css.img} src={image_url} />
      </div>
      <div className={css.body}>{body}</div>
    </div>
  )
}

export default PostContent
