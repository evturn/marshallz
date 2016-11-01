import { Observable as Ob$ } from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as API from 'api'

function fetchInitialData(action$) {
  return action$.ofType('FETCH_INITIAL_DATA')
    .mergeMap(API.fetchInitialData)
}

function fetchByAuthor(action$) {
  return action$.ofType('FETCH_BY_AUTHOR')
    .pluck('payload', 'author')
    .mergeMap(API.fetchByAuthor)
}

function fetchByDate(action$) {
  return action$.ofType('FETCH_BY_DATE')
    .pluck('payload')
    .mergeMap(API.fetchByDate)
}

export default combineEpics(fetchInitialData, fetchByAuthor, fetchByDate)