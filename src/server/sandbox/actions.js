import * as Rx from 'rxjs'
import fetch from 'isomorphic-fetch'

export const RUN_BOT = 'RUN_BOT'
export const SELECT_OPTION = 'SELECT_OPTION'
export const CLEAR_CONSOLE = 'CLEAR_CONSOLE'

export const selectOption = selection => (
  (actions, store) =>
    Rx.Observable.of(selection)
      .map(x => {
        return (x.name === store.getState().SB.selected[x.type].name) ?
          { type: SELECT_OPTION, payload: { [x.type]: false } } :
          { type: SELECT_OPTION, payload: { [x.type]: x } }
      })
)

export const runBot = selected => (
  (actions, store) =>
    Rx.Observable.fromPromise(makeRequest(selected))
      .map(x => ({ type: RUN_BOT, payload: x }))
)

export const clearConsole = _ => ({ type: CLEAR_CONSOLE })

function makeRequest(x) {
  return fetch(`/api`, {
    method: 'post',
    body: JSON.stringify(x),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(x => x.json())
  .catch(e => console.log(e))
}