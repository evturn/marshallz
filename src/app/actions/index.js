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

const perPage = 10;

const setPagination = ({ posts, page }) => {
  const first = ((page - 1) * perPage) + 1
  const last = page * perPage
  const pages = Math.ceil(posts.length / perPage)

  return {
    showing: posts.filter((x, i) => i >= first - 1 && i <= last - 1),
    pagination: {
      first,
      last,
      pages,
      page,
      previous: page > 1 ? page - 1 : false,
      next: page < pages ? page + 1 : false,
      total: posts.length,
      buttons: posts.map((x, i) => i + 1).filter(i => i <= pages)
    }
  }
}

export const filterPosts = (
  { params: { author }, query: { page }, filter }
) => dispatch => {

  dispatch(actions.filterPosts(setPagination({
    posts: author ? filter.author[author] : filter.all,
    page: page ? parseInt(page) : 1
  })));
}

