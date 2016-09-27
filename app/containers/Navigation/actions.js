export const fetchData = url => {
  return {
    type: 'FETCH',
    payload: { url },
  }
}
