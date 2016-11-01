import React from 'react'
import Bg from './headbg.jpg'
import Link from 'react-router/Link'
import css from './styles.css'

export default _ => (
  <header className={css.root} style={{ backgroundImage: `url(${Bg})` }} >
    <div className={css.nav}>
      <h1 className={css.title}><Link to="/">Marshallz Blog</Link></h1>
      <div className={css.caption}>Welcome! And more importantly, Welcome to Marshallz Blog!</div>
    </div>
  </header>
)
