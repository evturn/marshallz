import 'whatwg-fetch'
import { Observable } from 'rxjs'

const createPagination = ({ items, page, perPage }) => {
  const head = ((page - 1) * perPage)
  const segment = items.slice(head, (page * perPage))

  return {
    items: segment,
    pagination: {
      page,
      title: `Showing ${head + 1} - ${head + segment.length} of ${items.length} items`,
      next: items.length > 2 && page < Math.ceil(items.length / perPage)
        ? page + 1
        : false,
      previous: items.length > 2 && page > 1
        ? page - 1
        : false,
      pages: items
        .map((x, i) => i + 1)
        .filter(i => i <= Math.ceil(items.length / perPage))
    }
  }
}

export const filterPosts = ({ params, query }) => (
  (action, store) => {
    store.dispatch({ type: 'FETCH_POSTS' })

    return Observable.fromPromise(fetch(`/api/locals`).then(x => x.json()))
      .flatMap(({ items, authors, byAuthor }) => {
        return Observable.of({
          page: query.page ? parseInt(query.page) : 1,
          items: params.author ? byAuthor[params.author] : items,
          perPage: 10,
        })
        .map(createPagination)
        .map(x => ({
          authors,
          byAuthor,
          showing: x.items,
          pagination: x.pagination,
          author: params.author ? authors.filter(y => y.username === params.author)[0] : {},
        }))
      })
      .map(payload => ({ type: 'FILTER_POSTS',  payload }))
  }
)

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
