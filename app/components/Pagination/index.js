import React from 'react'
import A from '../A'
import css from './styles.css'

export default props => {
  const { back, next } = props.meta
  return (
    <div className={css.pagination}>
      <ul className={css.btns}>
        <PageButton
          direction={back}
          pathname={props.pathname}
          query={{ page: back }}
          icon={'fa fa-chevron-left'}
        />
        <PageButton
          direction={next}
          pathname={props.pathname}
          query={{ page: next }}
          icon={'fa fa-chevron-right'}
        />
      </ul>
    </div>
  )
}

const PageButton = props => {
  return (
    <li className={css.btn}>
      {props.direction
        ? <A
            pathname={props.pathname}
            query={props.query}>
            <span className={props.icon}>SHITE!</span>
          </A>
        : <span className={css.off} />
      }
    </li>
  )
}
