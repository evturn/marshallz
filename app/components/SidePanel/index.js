import React from 'react'
import A from '../A'
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
          <A
            className={css.sidelink}
            pathname={x.blog.url}>
            <Img
              className={css.hg}
              src={require(`images/${x.profile_img}`)} />
            <span className={css.name}>{x.name}</span>
          </A>
        </li>
      )}
    </ul>
  </div>
)
