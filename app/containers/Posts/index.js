import React from 'react'
import { Link } from 'react-router'
import { IntlProvider, FormattedRelative } from 'react-intl'

import css from './styles.css'

export default ({ posts }) => {
  return (
    <div className={css.posts}>
      {posts.map(x => <Post key={x._id} { ...x } />)}
    </div>
  )
}

function Post(props) {
  return (
    <div className={css.post}>
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.header}>

            <Link
              className={css.avatar}
              to={{ pathname: `/authors/${props.author.username}` }}>
              <img src={props.author.blog.avatar_img} />
            </Link>

          </div>
          <div className={css.info}>
            <div className={css.links}>

              <span className={css.name}>
                <Link to={{ pathname: `/authors/${props.author.username}` }}>
                  {props.author.name}
                </Link>
              </span>

              {props.author.twitter
                ? <Link
                    className={css.title}
                    to={{ pathname: props.author.twitter.url }}
                    target="_blank">
                    <span className="fa fa-twitter" />
                  </Link>
                : null
              }


            </div>
            <div className={css.meta}>
              <span className={css.tag}>Author</span>

              <IntlProvider locale="en">
                <div className={css.date}>
                  <FormattedRelative value={props.createdAt} />
                </div>
              </IntlProvider>

            </div>
          </div>
        </div>
        <div className={css.title}>
          <Link to={{ pathname: `/post/${props.slug}` }}>
            {props.title}
          </Link>
        </div>

        <div
          className={css.bg}
          style={{ backgroundImage: `url(${props.image_url})` }}
        />
        <div className={css.body}>{props.body}</div>
      </div>
    </div>
  )
}
