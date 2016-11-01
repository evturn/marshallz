import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timestamp from '../../components/Timestamp'
import Link from 'react-router/Link'
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
          <Link to={`/post/${this.props.slug}`}>{this.props.title}</Link>
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
  <Link className={css.avatar} to={url}>
    <Img className={css.img} src={src} />
  </Link>
)

const AuthorName = ({ url, name }) => (
  <span className={css.name}>
    <Link to={url}>{name}</Link>
  </span>
)

const AuthorSocial = ({ twitter }) => {
  if (!twitter) {
    return null
  }

  return (
    <a
      className={css.social}
      href={twitter.url}
      target="_blank">
      <span className="fa fa-twitter" />
    </a>
  )
}

export default connect(
  state => ({
    loading: state.global.loading,
  }))(Post)
