import 'whatwg-fetch'
import { Observable } from 'rxjs'

export const filterPosts = ({ params, query }) => (
  (action, store ) => {
    return Observable.fromPromise(fetch(`/api/locals`).then(x => x.json()))
      .flatMap(x => {
        return Observable.from([{
          params,
          query,
          ...x
        }])
        .map(filterSelectedItems)
        .map(createSegementation)
        .map(getSegmentItems)
        .map(getSegmentState)
        .map(getUpdatedState)
      })
      .map(payload => ({ type: 'FILTER_POSTS',  payload }))

    function filterSelectedItems(x) {
      return {
        ...x,
        page: x.query.page
          ? parseInt(x.query.page)
          : 1,
        posts: x.params.author
          ? x.filter.author[x.params.author]
          : x.pagination.items,
        author: x.params.author
          ? x.authors.filter(({ username }) => username === x.params.author)[0]
          : {}
      }
    }

    function createSegementation(x) {
      x.start = ((x.page - 1) * x.pagination.perPage)
      x.end = (x.page * x.pagination.perPage)
      x.pages = x.posts.map((x, i) => i + 1)
        .filter(i => i <= Math.ceil(x.posts.length / x.pagination.perPage))
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
      return { author, showing, pagination, authors: pagination.authors }
    }
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
