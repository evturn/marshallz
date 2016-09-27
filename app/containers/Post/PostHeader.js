import React from 'react'
import Timestamp from '../../components/Timestamp'
import A from '../../components/A'
import Img from '../../components/Img'
import css from './styles.css'

export default props => {
  return (
    <div className={css.header}>
      <A
        className={css.avatar}
        pathname={props.author.blog.url}>
        <Img
          className={css.img}
          src={require(props.author.avatar_img)}
        />
      </A>

      <div className={css.info}>
        <span className={css.name}>
          <A pathname={props.author.blog.url}>
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
