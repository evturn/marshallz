import { combineEpics } from 'redux-observable'
import navigationEpics from './containers/Navigation/epics'

export default combineEpics(navigationEpics)
