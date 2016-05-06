import { Observable } from 'rx'
import { DOM } from 'rx-dom'

const FILTER_POSTS   = payload => ({ type: 'FILTER_POSTS',  payload })
const FETCH_SUCCESS  = payload => ({ type: 'FETCH_SUCCESS', payload })
const FETCH_ERROR    = message => ({ type: 'FETCH_ERROR',   message })

export const fetchPost = slug =>
({ dispatch, getState }) => {
  DOM.ajax(`/api/post/${slug}`)
    .map(parseJSON)
    .map(mergeAuthorsProp)
    .map(getAuthorFromPost)
    .subscribe(
      x   => dispatch(FETCH_SUCCESS(x)),
      err => dispatch(FETCH_ERROR(err))
    )

  function parseJSON({ response }) {
    return JSON.parse(response)
  }

  function mergeAuthorsProp({ post }) {
    return {
      authors: getState().blog.authors,
      post
    }
  }

  function getAuthorFromPost(x) {
    x.author = x.authors
      .filter(({ username }) => username === x.post.author.username)[0]
    return x
  }
}

export const filterPosts = ({ params, query }) =>
({ dispatch, getState }) => {
  const intent$ = Observable.from([{
    params,
    query,
    perPage: getState().blog.pagination.perPage,
    items: getState().blog.pagination.items,
    filter: getState().blog.filter,
    authors: getState().blog.authors
  }])
  .map(filterSelectedItems)
  .map(createSegementation)
  .map(getSegmentItems)
  .map(getSegmentState)
  .map(getUpdatedState)
  .subscribe(x => dispatch(FILTER_POSTS(x)))

  function filterSelectedItems(x) {
    x.page = x.query.page ? parseInt(x.query.page) : 1
    x.posts = x.params.author ? x.filter.author[x.params.author] : x.items
    x.author = x.params.author ?
      x.authors.filter(({ username }) => username === x.params.author)[0] : {}
    return x
  }

  function createSegementation(x) {
    x.start = ((x.page - 1) * x.perPage)
    x.end = (x.page * x.perPage)
    x.pages = x.posts.map((x, i) => i + 1)
      .filter(i => i <= Math.ceil(x.posts.length / x.perPage))
    return x
  }

  function getSegmentItems(x) {
    x.showing = x.posts.slice(x.start, x.end)
    return x
  }

  function getSegmentState(x) {
    x.first = x.start + 1,
    x.last = x.start + x.showing.length,
    x.previous = x.page > 1 ? x.page - 1 : false,
    x.next = x.page < x.pages.length ? x.page + 1 : false
    x.total = x.posts.length
    return x
  }

  function getUpdatedState({ author, showing, ...pagination }) {
    return { author, showing, pagination }
  }
}