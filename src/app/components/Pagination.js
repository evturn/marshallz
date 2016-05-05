import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/pagination.less'

const cx = classNames.bind(css)

class Pagination extends Component {
  render() {
    const {
      next, previous, buttons,
      page, first, last, total } = this.props.pagination
    const { stats, pathname } = this.props
    const goForward = next ?
      <Link to={{ pathname, query: { page: next } }}>
        <span className="fa fa-chevron-right" />
      </Link> :
      <span className={cx('fa fa-chevron-right', 'off')} />
    const skipTo = buttons.map(x =>
      <li key={x} className={cx('btn')}>{x !== page ?
        <Link to={{ pathname, query: {page: x} }}><span>{x}</span></Link> :
        <span className={cx('off')}>{x}</span>
      }</li>)
    const goBack = previous ?
      <Link to={{ pathname, query: { page: previous } }}>
        <span className="fa fa-chevron-left" />
      </Link> :
      <span className={cx('fa fa-chevron-left', 'off')} />
    return (
      <div className={cx('pagination')}>
        <ul className={cx('btns')}>
          <li className={cx('btn')}>{goBack}</li>
          {skipTo}
          <li className={cx('btn')}>{goForward}</li>
        </ul>
        {stats ? <div className={cx('results')}>{`Showing ${first} - ${last} of ${total} posts.`}</div> : null}
      </div>
    )
  }
}

Pagination.propTypes = {
  stats: PropTypes.bool,
  pagination: PropTypes.object,
  pathname: PropTypes.string
}

export default connect(
  state => ({
    pagination: state.blog.pagination
  })
)(Pagination)