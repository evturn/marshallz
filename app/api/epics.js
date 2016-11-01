import { Observable as Ob$ } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { fetchInitialData } from 'api'

function fetchData(action$) {
  return action$.ofType('FETCH')
    .switchMap(action => {
      return Ob$
        .fromPromise(fetchInitialData())
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