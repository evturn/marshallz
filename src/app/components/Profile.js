import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/profile.less'

const cx = classNames.bind(css)

export default ({ authors, params }) => {
  const [ author ] = authors.filter(x => x.username === params.author)
  const { name, headshot, share, social } = author

  return (
    <div className={cx('profile')}>
      <div className={cx('av')}>
        <img src={`/dist/${headshot}`} />
      </div>
      <div className={cx('bio')}>
        <div className={cx('name')}>{name}</div>
        {social ? (
          <Link className={cx('social')} to={{ pathname: share.twitter }} target="_blank">
            <span className="fa fa-twitter" />
          </Link>
        ) : null}
      </div>
    </div>
  )
}
