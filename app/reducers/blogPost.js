import {
  GET_BLOG_POSTS_SUCCESS,
  GET_BLOG_POSTS_BEGIN,
  GET_BLOG_POSTS_ERROR
} from 'constants';


export default function blogPost(state={ blogPosts: [] }, action) {
  switch (action.type) {
    case GET_BLOG_POSTS_BEGIN:
      return {
        isFetching: true
      };
    case GET_BLOG_POSTS_SUCCESS:
      return {
        blogPosts: action.blogPosts,
        isFetching: false
      };
    case GET_BLOG_POSTS_ERROR:
      return {
        isFetching: false
      };
    default:
      return state;
  }
}
