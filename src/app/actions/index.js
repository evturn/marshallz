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
    .catch(err => dispatch(actions.fetchError(err)))
}

const setPagination = ({ posts, page }) => {
  const perPage = 10;

  const total = posts.length;
  const pages = Math.ceil(total / perPage);

  const previous = page > 1 ? page - 1 : false;
  const next = page < pages ? page + 1 : false;
  const first = ((page - 1) * perPage ) + 1;
  const last = page * perPage;

  const buttons = posts.map((item, i) => i + 1).filter(i => i <= pages);

  const showing = posts.filter((post, i) => i >= first - 1 && i <= last - 1);

  return {
    showing,
    pagination: {
      perPage, total, pages, page,
      buttons, previous, next, first, last
    }
  };
}

export const filterPosts = (
  { params: { author }, query: { page }, filter }) => dispatch => {

  dispatch(actions.filterPosts(setPagination({
    posts: author ? filter.author[author] : filter.all,
    page: page ? parseInt(page) : 1
  })));
}

