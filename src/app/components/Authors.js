import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/side-panel.less'

const cx = classNames.bind(css)

export default ({ authors }) => {
  return (
    <div className={cx('root')}>
      <ul>
        <li className={cx('title')}>Contributors</li>
        {authors.map((x, i) =>
          <li key={i}>
            <Link to={{ pathname: `/author/${x.username}` }}>
              <img src={require(`images/${x.headshot}`)} />
              <span className={cx('name')}>{x.name}</span>
            </Link>
          </li>
      )}</ul>
    </div>
  )
}