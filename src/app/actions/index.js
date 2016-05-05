import { Observable } from 'rx'
import { DOM } from 'rx-dom'

const FETCH_POST     =       _ => ({ type: 'FETCH_POST' })
const FETCH_SUCCESS  = payload => ({ type: 'FETCH_SUCCESS',  payload })
const FETCH_ERROR    = message => ({ type: 'FETCH_ERROR',    message })
const FILTER_POSTS   = payload => ({ type: 'FILTER_POSTS',   payload })
const DISPLAY_AUTHOR = payload => ({ type: 'DISPLAY_AUTHOR', payload })

export const fetchPost = slug =>
({ dispatch, getState }) => {
  DOM.ajax(`/api/post/${slug}`)
    .map(parseJSON)
    .map(getAuthorFromPost)
    .subscribe(
      x   => dispatch(FETCH_SUCCESS(x)),
      err => dispatch(FETCH_ERROR(err))
    )

  function parseJSON({ response }) {
    return JSON.parse(response)
  }

  function getAuthorFromPost({ post }) {
    const authors = getState().blog.authors
    const { author } = post
    return {
      author: authors.filter(({ username }) => author.username === username)[0],
      post
    }
  }
}

export const filterPosts = ({ params, query }) =>
({ dispatch, getState }) => {
  const route$ = Observable.from([{ author: params.author, page: query.page }])
  const page$ = route$.map(getCurrentPage)
  const posts$ = route$.map(getPostsByParam)
  const pages$ = posts$.map(getTotalPages)

  const author$ = Observable.from(getState().blog.authors)
    .filter(getAuthorByParam)
    .map(x => ({ author: x }))
    .subscribe(x => dispatch(DISPLAY_AUTHOR(x)))

  const pagination$ = Observable.combineLatest(posts$, page$, pages$)
    .map(createPagination)
    .map(filterVisiblePosts)
    .subscribe(x => dispatch(FILTER_POSTS(x)))

  function getAuthorByParam({ username }) {
    return username === params.author
  }

  function getPostsByParam({ author }) {
    const filter = getState().blog.filter
    return author ? filter.author[author] : filter.all
  }

  function getCurrentPage({ page }) {
    return page ? parseInt(page) : 1
  }

  function getTotalPages(posts) {
  const perPage = getState().blog.perPage
   return Math.ceil(posts.length / perPage)
 }

  function createPagination([posts, page, pages]) {
    const perPage = getState().blog.perPage
    return {
      posts,
      perPage,
      page,
      pages,
      first: ((page - 1) * perPage) + 1,
      last: page * perPage,
      total: posts.length,
      previous: page > 1 ? page - 1 : false,
      next: page < pages ? page + 1 : false,
      buttons: posts.map((x, i) => i + 1).filter(i => i <= pages)
    }
  }

  function filterVisiblePosts(x) {
    const { posts, first, last } = x
    return {
      showing: posts.filter((x, i) => i >= first - 1 && i <= last - 1),
      pagination: x
    }
  }
}