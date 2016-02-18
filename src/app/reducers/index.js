import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import data from './data';

const rootReducer = combineReducers({ data, routing: routeReducer });

export default rootReducer;