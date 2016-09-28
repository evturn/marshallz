import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'

function fetchData(action$) {
  return action$.ofType('FETCH')
    .switchMap(action => {
      const fetchPromise = fetch(`/api${action.payload.url}`).then(x => x.json())
      return Observable.fromPromise(fetchPromise)
        .map(data => ({
          type: 'FETCH_SUCCESS',
          payload: {
            ...data,
            url: action.payload.url,
          },
        }))
    })
}

export default combineEpics(fetchData)
