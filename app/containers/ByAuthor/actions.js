export const setLocationParams = params => ({
  type: 'SET_LOCATION_PARAMS',
  payload: { params },
})

export const unsetLocationParams = _ => ({
  type: 'UNSET_LOCATION_PARAMS'
})
