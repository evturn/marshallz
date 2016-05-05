import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/pagination.less'

const cx = classNames.bind(css)

class Pagination extends Component {
  render() {
    const { stats, pathname, isFiltered } = this.props
    const {
      next, previous, buttons, page, first, last, total
    } = this.props.pagination

    const goForward = (
      <li className={cx('btn')}>{next ? (
        <Link to={{ pathname, query: { page: next } }}>
          <span className="fa fa-chevron-right" />
        </Link>
      ) : (
        <span className={cx('fa fa-chevron-right', 'off')} />
      )}</li>)

    const skipTo = buttons.map(x =>
      <li key={x} className={cx('btn')}>{x !== page ? (
        <Link to={{ pathname, query: {page: x} }}><span>{x}</span></Link>
      ) : (
        <span className={cx('off')}>{x}</span>
      )}</li>)

    const goBack = (
      <li className={cx('btn')}>{previous ? (
        <Link to={{ pathname, query: { page: previous } }}>
          <span className="fa fa-chevron-left" />
        </Link>
      ) : (
        <span className={cx('fa fa-chevron-left', 'off')} />
      )}</li>)

    return (
      <div className={cx('pagination')}>
        {isFiltered ? (
          <ul className={cx('btns')}>
            {goBack}
            {skipTo}
            {goForward}
          </ul>
        ) : null}
        {stats ? <div className={cx('results')}>{`Showing ${first} - ${last} of ${total} posts.`}</div> : null}
      </div>
    )
  }
}

Pagination.propTypes = {
  stats: PropTypes.bool,
  pagination: PropTypes.object,
  pathname: PropTypes.string,
  isFiltered: PropTypes.bool
}

export default connect(
  state => ({
    pagination: state.blog.pagination,
    isFiltered: state.blog.isFiltered
  })
)(Pagination)