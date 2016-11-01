export const fetchInitialData = _ => ({
  type: 'FETCH_INITIAL_DATA'
})

export const fetchByDate = payload => ({
  type: 'FETCH_BY_DATE', payload
})

export const fetchByAuthor = payload => ({
  type: 'FETCH_BY_AUTHOR', payload
})

export const fetchPost = payload => ({
  type: 'FETCH_POST', payload
})