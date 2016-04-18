import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import blog from 'reducers/blog';

const rootReducer = combineReducers({
  blog,
  routing: routerReducer
});

export default rootReducer;