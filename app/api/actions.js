export const fetchInitialData = _ => ({
  type: 'FETCH_INITIAL_DATA'
})

export const fetchData = url => ({
  type: 'FETCH',
  payload: { url }
})

export const setLocationParams = params => ({
  type: 'SET_LOCATION_PARAMS',
  payload: { params },
})

export const unsetLocationParams = _ => ({
  type: 'UNSET_LOCATION_PARAMS'
})