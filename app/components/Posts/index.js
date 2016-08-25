import React from 'react'
import Post from 'components/Post'

import css from './styles.css'

export default ({ posts }) => {
  return (
    <div className={css.posts}>{posts.map((x, i) =>
      <Post key={i} { ...x } />
    )}</div>
  )
}
