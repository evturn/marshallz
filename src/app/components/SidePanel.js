import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/side-panel.less'

const cx = classNames.bind(css)

class SidePanel extends Component {
  render() {
    const { authors, fixed } = this.props
    return (
      <div className={cx('root', { fixed })}>
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
}

SidePanel.propTypes = {
  fixed: PropTypes.bool,
  authors: PropTypes.array,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    fixed: state.blog.fixed,
    authors: state.blog.authors
  })
)(SidePanel)