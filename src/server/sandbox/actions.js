import * as Rx from 'rxjs'
import * as DOM from 'rx-dom'

console.log(DOM)

export const RUN_BOT = 'RUN_BOT'
export const SELECT_OPTION = 'SELECT_OPTION'

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
    Rx.Observable.of(selected)
      .map(createRequestObject)
      .flatMap(DOM.ajax)
      .map(x => {
        console.log(x)
        return ({ type: RUN_BOT, res: JSON.parse(x.response) })
      })
)

function createRequestObject(x) {
  return {
    url: '/api',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(x)
  }
}