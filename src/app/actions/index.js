import fetch from 'isomorphic-fetch';
import { Observable } from 'rx'

const FETCH_POST     =       _ => ({ type: 'FETCH_POST' })
const FETCH_SUCCESS  = payload => ({ type: 'FETCH_SUCCESS',  payload })
const FETCH_ERROR    = message => ({ type: 'FETCH_ERROR',    message })
const FILTER_POSTS   = payload => ({ type: 'FILTER_POSTS',   payload })
const FIX_SIDE_PANEL = payload => ({ type: 'FIX_SIDE_PANEL', payload })

export const fetchPost = slug => dispatch => {
  fetch(`/api/post/${slug}`)
    .then(res => res.json())
    .then(res => dispatch(FETCH_SUCCESS(res.blog.post)))
    .catch(err => dispatch(FETCH_ERROR(err)))
}

export const filterPosts = ({ params, query, filter }) =>
  ({ dispatch, getState }) => {
    const perPage = getState().blog.perPage
    const route$ = Observable.from([{ author: params.author, page: query.page }])
    const posts$ = route$
      .map(({ author }) => author ? filter.author[author] : filter.all)

    const page$ = route$
      .map(({ page }) => page ? parseInt(page) : 1)

    const pages$ = posts$
      .map(x => Math.ceil(x.length / perPage))

    Observable.combineLatest(posts$, page$, pages$)
      .map(([posts, page, pages]) => {
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
      })
      .map(x => {
        const { posts, first, last } = x
        return {
          showing: posts.filter((x, i) => i >= first - 1 && i <= last - 1),
          pagination: x
        }
      })
      .subscribe(x => dispatch(FILTER_POSTS(x)))
}

let previous;
let direction;
let fixed;
export const fixSidePanel = _ => dispatch => {
  window.addEventListener('scroll', e => {
    if (window.innerWidth < 1024) {
      return;
    }

    const current = window.scrollY;

    fixed = fixed === undefined ? false : fixed


    if (previous) {
      if (previous < current) {
        direction = 'DOWN'
      } else if (previous > current ) {
        direction = 'UP'
      }

      if (current >= 155 && !fixed && direction === 'DOWN') {
        dispatch(FIX_SIDE_PANEL(true))
        fixed = true
      } else if (current < 155 && fixed && direction === 'UP') {
        dispatch(FIX_SIDE_PANEL(false))
        fixed = false
      }
    }

    previous = current;
  })
}