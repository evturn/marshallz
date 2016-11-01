import React from 'react'
import Link from 'react-router/Link'
import ProfilePic from 'components/ProfilePic'
import css from './style.css'

export default ({ authors }) => (
  <div className={css.root}>
    <ul>
      <li className={css.title}>Writers</li>
      {authors.map(x =>
        <li key={x._id} className={css.li}>
          <Link className={css.sidelink} to={x.blog.url}>
            <ProfilePic className={css.hg} src={x.profile_img} />
            <span className={css.name}>{x.name}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)
