import React from 'react'
import Timestamp from '../../components/Timestamp'
import A from '../../components/A'
import css from './styles.css'

export default props => {
  return (
    <div className={css.header}>
      <A
        className={css.avatar}
        pathname={`/authors/${props.author.username}`}>
        <img src={props.author.blog.avatar_img} />
      </A>

      <div className={css.info}>
        <span className={css.name}>
          <A pathname={`/authors/${props.author.username}` }>
            {props.author.name}
          </A>
        </span>

        {props.author.twitter
          ? <A
              className={css.social}
              pathname={props.author.twitter.url}
              target="_blank">
              <span className="fa fa-twitter" />
            </A>
          : null
        }

        <span className={css.tag}>Author</span>

        <Timestamp
          className={css.date}
          value={props.createdAt}
        />
      </div>
    </div>
  )
}
