import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timestamp from '../../components/Timestamp'

import A from '../../components/A'
import Img from '../../components/Img'
import css from './styles.css'

 class Post extends Component {
  render() {
    return (
      <div className={css.post}>
        <div className={css.header}>

          <AuthorAvatar url={this.props.author.blog.url} src={require(`images/${this.props.author.avatar_img}`)} />

          <div className={css.info}>
            <AuthorName url={this.props.author.blog.url} name={this.props.author.name}  />
            <AuthorSocial twitter={this.props.author.twitter} />
            <span className={css.tag}>Author</span>
            <Timestamp className={css.date} value={this.props.timestamp} />
          </div>
        </div>

        <div className={css.title}>
          <A pathname={`/post/${this.props.slug}`}>{this.props.title}</A>
        </div>

        <div className={css.media}>
          <Img
            className={css.img}
            src={this.props.image_url} />
        </div>


        <div className={css.body}>{this.props.body}</div>
      </div>
    )
  }
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

export default connect(
  state => ({
    loading: state.global.loading,
  }))(Post)
