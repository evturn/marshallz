function bot(state={
  author: null,
  posts: null,
  bots: [],
  populated: false
}, action) {
  switch (action.type) {
    case 'BOTS_POPULATED':
      return Object.assign({}, state, {
        bots: action.bots,
        populated: true
      });
    case 'AUTHOR_SELECTED':
      return Object.assign({}, state, {
        author: action.author,
        posts: action.posts
      });
    default:
      return state;
  }
}

export default bot;