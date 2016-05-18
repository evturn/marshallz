import * as Rx from 'rxjs'

export const FETCH_BOT_PENDING = 'FETCH_BOT_PENDING'
export const FETCH_BOT_FULFILLED = 'FETCH_BOT_FULFILLED'
export const FETCH_BOT_ABORTED = 'FETCH_BOT_ABORTED'
export const SELECT_BOT = 'SELECT_BOT'
export const SELECT_JOB = 'SELECT_JOB'
export const SELECT_SRC = 'SELECT_SRC'

export const selectBot = bot => (
  (actions, store) =>
    Rx.Observable.of(bot)
      .map(x => {
        return (x.username === store.getState().SB.selected.bot.username) ?
          { type: SELECT_BOT, payload: false } :
          { type: SELECT_BOT, payload: x }
      })
      .startWith({ type: FETCH_BOT_PENDING })
)

export const selectJob = job => (
  (actions, store) =>
    Rx.Observable.of(job)
      .map(x => {
        return (x.name === store.getState().SB.selected.job.name) ?
          { type: SELECT_JOB, payload: false } :
          { type: SELECT_JOB, payload: x }
      })
      .startWith({ type: FETCH_BOT_PENDING })
)

export const selectSrc = src => (
  (actions, store) =>
    Rx.Observable.of(src)
      .map(x => {
        return (x.name === store.getState().SB.selected.src.name) ?
          { type: SELECT_SRC, payload: false } :
          { type: SELECT_SRC, payload: x }
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