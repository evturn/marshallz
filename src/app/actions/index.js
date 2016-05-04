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

export const filterPosts = ({ params, query, filter }) => ({ dispatch, getState }) => {
  const { author } = params
  const posts = author ? filter.author[author] : filter.all
  const page = query.page ? parseInt(query.page) : 1
  const perPage = getState().blog.perPage
  // const filter$ = Observable.from([{ posts, page }])

  const first = ((page - 1) * perPage) + 1
  const last = page * perPage
  const pages = Math.ceil(posts.length / perPage)

  dispatch(FILTER_POSTS({
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
  }))
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