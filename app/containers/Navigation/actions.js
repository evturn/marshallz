
export const fetchInitialData = _ => ({
  type: 'FETCH_INITIAL_DATA'
})

export const fetchData = url => ({
  type: 'FETCH',
  payload: { url }
})

