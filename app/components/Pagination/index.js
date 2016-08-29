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
          icon={css.back}
        />
        <PageButton
          direction={next}
          pathname={props.pathname}
          query={{ page: next }}
          icon={css.next}
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
            <span className={props.icon} />
          </A>
        : <span className={`${props.icon} ${css.off}`} />
      }
    </li>
  )
}
