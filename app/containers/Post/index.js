import React, { Component } from 'react'
import Timestamp from '../../components/Timestamp'
import A from '../../components/A'
import Img from '../../components/Img'
import css from './styles.css'

export default props => {
  if (!props.author) {
    return null
  }

  return (
    <div className={css.post}>

      <div className={css.header}>
        <AuthorAvatar  url={props.author.blog.url} src={require(`images/${props.author.avatar_img}`)} />

        <div className={css.info}>
          <AuthorName url={props.author.blog.url} name={props.author.name}  />
          <AuthorSocial twitter={props.author.twitter} />
          <span className={css.tag}>Author</span>
          <Timestamp className={css.date} value={props.createdAt} />
        </div>
      </div>

      <div className={css.title}>
        <A pathname={`/post/${props.slug}`}>{props.title}</A>
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

const AuthorAvatar = ({ url, src })=> (
  <A
    className={css.avatar}
    pathname={url}>
    <Img
      className={css.img}
      src={src}
    />
  </A>
)

const AuthorName = ({ url, name }) => (
  <span className={css.name}>
    <A pathname={url}>{name}</A>
  </span>
)

const AuthorSocial = ({ twitter }) => {
  if (!twitter) {
    return null
  }

  return (
    <A
      className={css.social}
      pathname={twitter.url}
      target="_blank">
      <span className="fa fa-twitter" />
    </A>
  )
}

