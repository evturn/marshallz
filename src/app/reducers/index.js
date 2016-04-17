import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from 'reducers/data';

const rootReducer = combineReducers({
  data,
  routing: routerReducer
});

export default rootReducer;