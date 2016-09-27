import React, { Component } from 'react'
import PostHeader from './PostHeader'
import A from '../../components/A'
import Img from '../../components/Img'
import css from './styles.css'

export default props => {
  return (
    <div className={css.post}>
      <PostHeader
        author={props.author}
        createdAt={props.createdAt}
      />

      <div className={css.title}>
        <A pathname={`/post/${props.slug}` }>
          {props.title}
        </A>
      </div>

      <Img
        className={css.bg}
        index={props.index}
        url={props.image_url}
      />

      <div className={css.body}>{props.body}</div>

    </div>
  )
}

