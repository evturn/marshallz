export default (state=null, action) => {
  switch (action.type) {
    case 'SET_LOCATION_PARAMS':
      return action.payload.params

    case 'UNSET_LOCATION_PARAMS':
      return null

    default:
      return state
  }
}
