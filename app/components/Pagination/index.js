import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import css from './styles.css'

class Pagination extends Component {
  render() {
    const { stats, pathname } = this.props
    const {
      next, previous, pages, page, first, last, total
    } = this.props.pagination

    const goForward = (
      <li className={css.btn}>{next ? (
        <Link to={{ pathname, query: { page: next } }}>
          <span className="fa fa-chevron-right" />
        </Link>
      ) : (
        <span className={css.off} />
      )}</li>)

    const skipTo = pages.map(x =>
      <li key={x} className={css.btn}>{x !== page ? (
        <Link to={{ pathname, query: {page: x} }}><span>{x}</span></Link>
      ) : (
        <span className={css.off}>{x}</span>
      )}</li>)

    const goBack = (
      <li className={css.btn}>{previous ? (
        <Link to={{ pathname, query: { page: previous } }}>
          <span className="fa fa-chevron-left" />
        </Link>
      ) : (
        <span className={css.off} />
      )}</li>)

    return (
      <div className={css.pagination}>
        <ul className={css.btns}>
          {goBack}
          {skipTo}
          {goForward}
        </ul>
        {stats ? <div className={css.results}>{`Showing ${first} - ${last} of ${total} posts.`}</div> : null}
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
