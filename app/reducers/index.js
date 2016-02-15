import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import blog from './blog';
import bot from './bot';

const rootReducer = combineReducers({ blog, bot, routing: routeReducer });

export default rootReducer;