import React, { Component } from 'react';
import Post from 'components/Post';
import classNames from 'classnames/bind';
import css from 'less/components/blog-posts.less';

const cx = classNames.bind(css);

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.posts,
      pagination: {
        page: 1,
        perPage: 5,
      },
    };

    this.onSelect = this.onSelect.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
  }
  render() {
    const data = this.state.data || [];
    const pagination = this.state.pagination || {};
    const paginated = paginate(data, pagination);
    const pages = Math.ceil(data.length / Math.max(
      isNaN(pagination.perPage) ? 1 : pagination.perPage, 1)
    );
    return (
      <div className={cx('blog-posts')}>
        <Paginator.Context
          className={cx('pages')}
          segments={segmentize({
            page: pagination.page,
            pages: pages,
            beginPages: 1,
            endPages: 1,
            sidePages: 1
          })} onSelect={this.onSelect}>
          <div className={cx('page')}>
            <Paginator.Button page={pagination.page - 1}>Previous</Paginator.Button>
          </div>

          <div className={cx('page')}>
            <Paginator.Segment field="beginPages" />
          </div>

          <div className={cx('page')}>
            <Paginator.Segment field="previousPages" />
          </div>
          <div className={cx('page')}>
            <Paginator.Segment field="centerPage" className={cx('selected')} />
          </div>
          <div className={cx('page')}>
            <Paginator.Segment field="nextPages" />
          </div>

          <div className={cx('page')}>
            <Paginator.Segment field="endPages" />
          </div>

          <div className={cx('page')}>
            <Paginator.Button page={pagination.page + 1}>Next</Paginator.Button>
          </div>
        </Paginator.Context>

        {paginated.data.map((post, i) =>
          <Post key={i} {...post} />
        )}

        <Paginator.Context
          className={cx('pages')}
          segments={segmentize({
            page: pagination.page,
            pages: pages,
            beginPages: 1,
            endPages: 1,
            sidePages: 1
          })} onSelect={this.onSelect}>
          <div className={cx('page')}>
            <Paginator.Button page={pagination.page - 1}>Previous</Paginator.Button>
          </div>

          <div className={cx('page')}>
            <Paginator.Segment field="beginPages" />
          </div>

          <div className={cx('page')}>
            <Paginator.Segment field="previousPages" />
          </div>
          <div className={cx('page')}>
            <Paginator.Segment field="centerPage" className={cx('selected')} />
          </div>
          <div className={cx('page')}>
            <Paginator.Segment field="nextPages" />
          </div>

          <div className={cx('page')}>
            <Paginator.Segment field="endPages" />
          </div>

          <div className={cx('page')}>
            <Paginator.Button page={pagination.page + 1}>Next</Paginator.Button>
          </div>
        </Paginator.Context>
      </div>
    );
  }
  onSelect(page) {
    const pagination = this.state.pagination || {};
    const pages = Math.ceil(this.state.data.length / pagination.perPage);

    pagination.page = Math.min(Math.max(page, 1), pages);

    this.setState({
      pagination: pagination
    });
  }
  onPerPage(event) {
    let pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 5);

    this.setState({
      pagination: pagination
    });
  }
}

function paginate(d, o) {
  const data = d || [];
  const page = o.page - 1 || 0;
  const perPage = o.perPage;

  const amountOfPages = Math.ceil(data.length / perPage);
  const startPage = page < amountOfPages? page: 0;

  return {
    amount: amountOfPages,
    data: data.slice(startPage * perPage, startPage * perPage + perPage),
    page: startPage
  };
}

export default Pagination;