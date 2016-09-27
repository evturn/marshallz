import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'

function fetchData(action$) {
  return action$.ofType('FETCH')
    .switchMap(action => {
      const { pathname, query, params } = action.payload
      const url = `/api${pathname}${query && query.page ? `?page=${query.page}` : ''}`
      const fetchPromise = fetch(url).then(x => x.json())
      return Observable.fromPromise(fetchPromise)
        .map(data => ({
          type: 'FETCH_SUCCESS',
          payload: data,
        }))
      }
    )
}

function fetchByAuthor(action$) {
  return action$.ofType('FETCH_BY_AUTHOR')
    .switchMap(action => {
      const { pathname, query } = action.payload
      const url = `/api${pathname}${query && query.page ? `?page=${query.page}` : ''}`
      const fetchPromise = fetch(url).then(x => x.json())
      return Observable.fromPromise(fetchPromise)
        .map(data => ({
          type: 'FETCH_SUCCESS',
          payload: data,
        }))
      }
    )
}

export default combineEpics(fetchData, fetchByAuthor)
