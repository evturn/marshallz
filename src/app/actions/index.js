import fetch from 'isomorphic-fetch';

const actions = {
  fetchPost:          _ => ({ type: 'FETCH_POST' }),
  fetchSuccess: payload => ({ type: 'FETCH_SUCCESS', payload }),
  fetchError:   message => ({ type: 'FETCH_ERROR', message }),
  filterPosts:  payload => ({ type: 'FILTER_POSTS', payload })
};

export const fetchPost = slug => dispatch => {
  fetch(`/api/post/${slug}`)
    .then(res => res.json())
    .then(res => dispatch(actions.fetchSuccess(res.blog.post)))
    .catch(err => dispatch(actions.fetchError(err)));
};

export const filterPosts = props => dispatch => {
  const { params, query, filter } = props;
  let posts;

  if (params.author) {
    posts = filter.author[params.author];
  } else {
    posts = filter.all;
  }

  const currentPage = query.page ? parseInt(query.page) : 1;
  const blogState = setPagination(posts, currentPage);

  dispatch(actions.filterPosts(blogState));
};

function setPagination(posts, currentPage) {
  const perPage = 10;
  const total = posts.length;
  const pages = Math.ceil(total / perPage);
  const previous = currentPage > 1 ? currentPage - 1 : false;
  const next = currentPage < pages ? currentPage + 1 : false;
  const first = ((currentPage - 1) * perPage ) + 1;
  const last = currentPage * perPage;
  const buttons = posts.map((item, i) => i + 1).filter(i => i <= pages);
  const showing = posts.filter((post, i) => i >= first - 1 && i <= last - 1);

  return {
    showing,
    pagination: {
      perPage, total, pages, currentPage,
      buttons, previous, next, first, last
    }
  };
}