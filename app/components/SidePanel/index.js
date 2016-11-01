import React from 'react'
import Link from 'react-router/Link'
import Img from '../Img'
import css from './style.css'

export default ({ authors }) => (
  <div className={css.root}>
    <ul>
      <li className={css.title}>Writers</li>
      {authors.map(x =>
        <li
          key={x._id}
          className={css.li}>
          <Link
            className={css.sidelink}
            to={x.blog.url}>
            <Img
              className={css.hg}
              src={require(`images/${x.profile_img}`)} />
            <span className={css.name}>{x.name}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)
