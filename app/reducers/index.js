import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import blogPost from 'reducers/blogPost';
import { routeReducer as routing } from 'redux-simple-router';

const rootReducer = combineReducers({
  topic,
  user,
  blogPost,
  routing
});

export default rootReducer;
