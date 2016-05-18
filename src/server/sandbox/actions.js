import * as Rx from 'rxjs'

export const RUN_WAITING = 'RUN_WAITING'
export const SELECT_OPTION = 'SELECT_OPTION'

export const selectOption = selection => (
  (actions, store) =>
    Rx.Observable.of(selection)
      .map(x => {
        return (x.name === store.getState().SB.selected[x.type].name) ?
          { type: SELECT_OPTION, payload: { [x.type]: false } } : { type: SELECT_OPTION, payload: { [x.type]: x } }
      })
)