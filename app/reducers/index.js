import { combineReducers } from 'redux';
import bot from 'reducers/bot';
import blogPost from 'reducers/blogPost';
import { routeReducer as routing } from 'redux-simple-router';

const rootReducer = combineReducers({
  bot,
  blogPost,
  routing
});

export default rootReducer;
