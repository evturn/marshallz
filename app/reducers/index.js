import { combineReducers } from 'redux';
import blogPost from 'reducers/blogPost';
import { routeReducer as routing } from 'redux-simple-router';

const rootReducer = combineReducers({
  blogPost,
  routing
});

export default rootReducer;
