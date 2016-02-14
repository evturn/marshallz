import { combineReducers } from 'redux';
import blog from 'reducers/blog';
import bot from 'reducers/bot';
import { routeReducer as routing } from 'redux-simple-router';

const rootReducer = combineReducers({
  blog,
  bot,
  routing
});

export default rootReducer;
