function bot(state={
  bots: [],
  populated: false
}, action) {
  switch (action.type) {
    case 'BOTS_POPULATED':
      return Object.assign({}, state, {
        bots: action.bots,
        populated: true
      });
    default:
      return state;
  }
}

export default bot;