import * as Rx from 'rxjs'

export const FETCH_BOT_PENDING = 'FETCH_BOT_PENDING'
export const FETCH_BOT_FULFILLED = 'FETCH_BOT_FULFILLED'
export const FETCH_BOT_ABORTED = 'FETCH_BOT_ABORTED'
export const SELECT_BOT_FULFILLED = 'SELECT_BOT_FULFILLED'
export const DESELECT_BOT = 'DESELECT_BOT'

export const selectBot = bot => (
  (actions, store) =>
    Rx.Observable.of(bot)
      .map(x => {
        return (x.username === store.getState().SB.selected.username) ?
          { type: SELECT_BOT_FULFILLED, payload: false } :
          { type: SELECT_BOT_FULFILLED, payload: x }
      })
      .startWith({ type: FETCH_BOT_PENDING })
)


export const fetchBot = () => (
  (actions, store) => Rx.Observable.of({ headshot: 'hs-borf.png', displayName: 'Cranky' })
    .delay(1000)
    .map(
      payload => ({ type: FETCH_BOT_FULFILLED, payload })
    )
    .takeUntil(
      actions.ofType(FETCH_BOT_ABORTED)
    )
    .startWith({ type: FETCH_BOT_PENDING })
)

export const abortFetchBot = () => ({ type: FETCH_BOT_ABORTED })