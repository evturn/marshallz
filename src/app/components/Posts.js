import React from 'react'
import Post from 'components/Post'
import classNames from 'classnames/bind'
import css from 'less/components/posts.less'

const cx = classNames.bind(css)

export default ({ posts }) => {
  return (
    <div className={cx('posts')}>{posts.map((x, i) =>
      <Post key={i} { ...x } />
    )}</div>
  )
}