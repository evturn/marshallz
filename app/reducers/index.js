import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import blog from './blog';
import author from './author';

const rootReducer = combineReducers({ blog, author, routing: routeReducer });

export default rootReducer;