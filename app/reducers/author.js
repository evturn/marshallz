function author(state={
  author: null,
  posts: null,
  authors: null,
  populated: false
}, action) {
  switch (action.type) {
    case 'AUTHORS_POPULATED':
      return Object.assign({}, state, {
        authors: action.authors,
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

export default author;