export const fetchData = url => {
  return {
    type: 'FETCH',
    payload: { url },
  }
}

export const fetchSuccess = data => {
  return {
    type: 'FETCH_SUCCESS',
    payload: data,
  }
}

export const fetchError = e => {
  return {
    type: 'FETCH_ERROR',
    error: e.message,
  }
}