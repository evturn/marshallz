import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/pagination.less';

const cx = classNames.bind(css);

class Pagination extends Component {
  render() {
    const {
      total, pages, next, previous, buttons,
      currentPage, first, last, pathname} = this.props;

    const backArrow = <span className="fa fa-chevron-left" />;
    const forwardArrow = <span className="fa fa-chevron-right" />;
    const pageResults = `Showing ${first} - ${last} of ${total}`;

    const back = (
      <li className={cx('page')}>{previous ? (
        <Link to={{ pathname, query: { page: previous } }}>{backArrow}</Link>
        ) : (
        <a className={cx('off')}>{backArrow}</a>
      )}</li>
    );

    const skipTo = buttons.map(page =>
      <li key={page} className={cx('page')}>{page !== currentPage ? (
        <Link to={{ pathname, query: {page} }}>{page}</Link>
        ) : (
        <a className={cx('off')}>{page}</a>
      )}</li>
    );

    const forward = (
      <li className={cx('page')}>{next ? (
        <Link to={{ pathname, query: { page: next } }}>{forwardArrow}</Link>
        ) : (
        <a className={cx('off')}>{forwardArrow}</a>
      )}</li>
    );

    return (
      <div className={cx('pagination')}>
        <div className={cx('page-results')}>{pageResults}</div>
        <ul className={cx('pages')}>
          {back}
          {skipTo}
          {forward}
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  pages: PropTypes.number,
  buttons: PropTypes.array,
  first: PropTypes.number,
  last: PropTypes.number,
  currentPage: PropTypes.number,
  pathname: PropTypes.string,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    total: state.blog.pagination.total,
    pages: state.blog.pagination.pages,
    buttons: state.blog.pagination.buttons,
    first: state.blog.pagination.first,
    last: state.blog.pagination.last,
    previous: state.blog.pagination.previous,
    next: state.blog.pagination.next,
    currentPage: state.blog.pagination.currentPage
  })
)(Pagination);