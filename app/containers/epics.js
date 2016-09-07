import fetch from 'isomorphic-fetch'
import { combineEpics } from 'redux-observable'
import { fetchSuccess, fetchError } from './actions'
import { Observable } from 'rxjs'

function fetchData(action$) {
  return action$.ofType('FETCH')
    .map(action => action.payload.url)
    .switchMap(url => {
      const fetchPromise = fetch(url)
        .then(x => x.json())
      return Observable.fromPromise(fetchPromise)
        .map(fetchSuccess)
        .catch(fetchError)
      }
    )
}

export default combineEpics(fetchData)