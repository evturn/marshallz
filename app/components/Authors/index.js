import React from 'react'
import { Link } from 'react-router'
import css from './styles.css'

import borf from '../Profile/hs-borf.png'
import marshall from '../Profile/hs-marshall.png'
import clang from '../Profile/hs-clang.png'

export default ({ authors }) => {
  console.log(authors)
  return (
    <div className={css.root}>
      <ul>
        <li className={css.title}>Contributors</li>
        {authors.map((x, i) =>
          <li key={i}>
            <Link to={{ pathname: `/author/${x.username}` }}>
              <img src={borf} />
              <span className={css.name}>{x.name}</span>
            </Link>
          </li>
      )}</ul>
    </div>
  )
}
