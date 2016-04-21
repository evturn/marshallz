import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/side-panel.less'

const cx = classNames.bind(css)

const SidePanel = ({ authors }) => {
  return (
    <div className={cx('authors')}>
      <ul>
        <li className={cx('title')}>Contributors</li>
        {authors.map((x, i) =>
          <li key={i}>
            <Link to={{ pathname: `/author/${x.username}` }}>
              <img src={require(`images/${x.avatar}`)} />
              <span className={cx('name')}>{x.name}</span>
            </Link>
          </li>
      )}</ul>
    </div>
  )
}

export default SidePanel