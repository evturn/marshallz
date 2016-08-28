import React from 'react'
import Bg from './headbg.jpg'
import A from '../A'
import css from './styles.css'

export default _ => (
  <header className={css.root} style={{ backgroundImage: `url(${Bg})` }} >
    <div className={css.nav}>
      <h1 className={css.title}><A pathname="/">Marshallz Blog</A></h1>
      <div className={css.caption}>Welcome! And more importantly, Welcome to Marshallz Blog!</div>
    </div>
  </header>
)
