import * as Rx from 'rxjs';

export const FETCH_BOT_PENDING = 'FETCH_BOT_PENDING';
export const FETCH_BOT_FULFILLED = 'FETCH_BOT_FULFILLED';
export const FETCH_BOT_ABORTED = 'FETCH_BOT_ABORTED';
export const SELECT_BOT_FULFILLED = 'SELECT_BOT_FULFILLED';

export const fetchBot = () => (
  (actions, store) => Rx.Observable.of({ headshot: 'hs-borf.png', displayName: 'Cranky' })
    // Delaying to emulate an async request, like Rx.Observable.ajax('/api/path')
    .delay(1000)
    // When our request comes back, we transform it into an action
    // that is then automatically dispatched by the middleware
    .map(
      payload => ({ type: FETCH_BOT_FULFILLED, payload })
    )
    // Abort fetching the user if someone dispatches an abort action
    .takeUntil(
      actions.ofType(FETCH_BOT_ABORTED)
    )
    // Let's us immediately update the user's state so we can display
    // loading messages to the user, etc.
    .startWith({ type: FETCH_BOT_PENDING })
);

export const selectBot = bot => (
  (actions, store) => Rx.Observable.of(bot)
    // Delaying to emulate an async request, like Rx.Observable.ajax('/api/path')
    .delay(1000)
    // When our request comes back, we transform it into an action
    // that is then automatically dispatched by the middleware
    .map(
      payload => ({ type: SELECT_BOT_FULFILLED, payload })
    )
    // Abort fetching the user if someone dispatches an abort action
    .takeUntil(
      actions.ofType(FETCH_BOT_ABORTED)
    )
    // Let's us immediately update the user's state so we can display
    // loading messages to the user, etc.
    .startWith({ type: FETCH_BOT_PENDING })
);

// Plain old action
export const abortFetchBot = () => ({ type: FETCH_BOT_ABORTED });